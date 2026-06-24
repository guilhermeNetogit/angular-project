import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeiroComponent } from "./primeiro-component/primeiro";
import { SegundoComponent } from "./segundo-component/segundo";
import { TerceiroComponent } from "./terceiro-component/terceiro";
import { Usuarios } from "./usuarios/usuarios";
import { MatIcon } from "@angular/material/icon";
import { Logo } from "./logo/logo";
import { Pipes } from './pipes/pipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Usuarios, PrimeiroComponent, SegundoComponent, TerceiroComponent, MatIcon, Logo, Pipes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  protected readonly title = signal('angular-project');

  // Armazena a aba/componente que está visível atualmente
  protected readonly componenteAtivo = signal<string>('usuarios');

  constructor() {
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
}
