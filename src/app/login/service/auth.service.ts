import { Router } from '@angular/router';
import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioAtual = signal<string | null>(null);

  exibirMenuManual = signal<boolean>(false);

  mostrarMenu = computed(() => this.usuarioAtual() !== null || this.exibirMenuManual());

  private userAuthenticated: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  fazerLogin(user: User) {
    if (user.login === 'guilherme.neto' &&
        user.senha === '123456'
    ) {
      this.userAuthenticated = true;

      localStorage.setItem('userName', user.login);
      this.usuarioAtual.set(user.login);

      this.exibirMenuManual.set(true);
      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    } else {
      this.fazerLogout();
    }
  }

  fazerLogout() {
    this.userAuthenticated = false;

    // 1. Limpa o nome salvo no navegador
    localStorage.removeItem('userName');

    // 2. Reseta os sinais para sumir com o nome e com o menu na hora
    this.usuarioAtual.set(null);
    this.exibirMenuManual.set(false);

    // 3. Avisa os componentes antigos (se necessário) e manda para a tela de login
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']); // ou o caminho da sua rota de login
  }
}
