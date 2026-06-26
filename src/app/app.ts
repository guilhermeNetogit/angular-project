import { Component, effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { Logo } from "./logo/logo";
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, Logo, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  menuItems = routes.filter(r => r.data && r.data['title']);

  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

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
