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

  mensagemErro = signal<string | null>(null);

  private userAuthenticated: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuariosValidos = [
    { login: 'guilherme.neto', senha: '123456' },
    { login: 'guest', senha: '654321' }
  ];

  userIsAuthenticated() {
    return this.userAuthenticated;
  }

  constructor(private router: Router) {

    const usuarioSalvo = sessionStorage.getItem('userName');
      if (usuarioSalvo) {
        this.userAuthenticated = true;
        this.usuarioAtual.set(usuarioSalvo);
        this.exibirMenuManual.set(true);
      }
  }

  fazerLogin(user: User) {

    const usuarioEncontrado = this.usuariosValidos.find(
      u => u.login === user.login && u.senha === user.senha
    );
    if (usuarioEncontrado) {
      this.userAuthenticated = true;

      this.mensagemErro.set(null);

      sessionStorage.setItem('userName', user.login);
      this.usuarioAtual.set(user.login);

      this.exibirMenuManual.set(true);
      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    } else {
      this.mensagemErro.set('Login ou senha inválidos!');
      this.fazerLogout();
    }
  }

  fazerLogout() {
    this.userAuthenticated = false;

    // 1. Limpa o nome salvo no navegador
    sessionStorage.removeItem('userName');

    // 2. Reseta os sinais para sumir com o nome e com o menu na hora
    this.usuarioAtual.set(null);
    this.exibirMenuManual.set(false);

    // 3. Avisa os componentes antigos (se necessário) e manda para a tela de login
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']); // ou o caminho da sua rota de login
  }
}
