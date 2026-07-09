import { Component, computed, effect, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './login/service/auth.service';
import { Logo } from "./logo/logo";
import { UsuariosGuard } from './guards/usuarios.guard';
import { QuartoGuard } from './guards/quarto.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, Logo, RouterLink, RouterLinkActive],
  providers: [AuthService, UsuariosGuard, QuartoGuard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  nomeUser = signal<string | null | undefined>(localStorage.getItem('userName'));

  mostrarMenu = computed(() => this.nomeUser() !== null && this.nomeUser() !== undefined);

  menuItems = appRoutes.filter(r => r.data && r.data['title']);

  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  // Armazena a aba/componente que está visível atualmente
  protected readonly componenteAtivo = signal<string>('usuarios');

  constructor(public authService: AuthService) {
      // Sincroniza o sinal com a classe do HTML automaticamente
      effect(() => {
        if (this.isDarkMode()) {
          document.documentElement.classList.add('dark-mode');
          document.body.classList.add('dark-mode');
        } else {
          document.documentElement.classList.remove('dark-mode');
          document.body.classList.remove('dark-mode');
        }
      });
    }

    toggleTheme() {
    this.isDarkMode.update(dark => {
      const nextMode = !dark;
      // 2. Salva o novo estado no localStorage para persistir no F5
      localStorage.setItem('theme', nextMode ? 'dark' : 'light');
      return nextMode;
    });
  }

 ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe((mostrar: boolean) => {
      if (mostrar) {
        const usuarioLogado = localStorage.getItem('userName');
        this.nomeUser.set(usuarioLogado || 'Usuário Logado');
      } else {
        this.nomeUser.set(null);
      }
    });
  }
}
