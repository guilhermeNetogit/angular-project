import { Router } from '@angular/router';
import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { User } from '../user';
import { USUARIOS_VALIDOS } from '../../../../environments/users.cfg';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private SESSION_KEY = 'userName';

  usuarioAtual = signal<string | null>(sessionStorage.getItem(this.SESSION_KEY));

  exibirMenuManual = signal<boolean>(!!sessionStorage.getItem(this.SESSION_KEY));

  mostrarMenu = computed(() => this.usuarioAtual() !== null || this.exibirMenuManual());

  mensagemErro = signal<string | null>(null);

  private userAuthenticated: boolean = !!sessionStorage.getItem(this.SESSION_KEY);
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private usuariosValidos = USUARIOS_VALIDOS;

  constructor(private router: Router) {

    const usuarioSalvo = sessionStorage.getItem(this.SESSION_KEY);
      if (usuarioSalvo) {
        this.userAuthenticated = true;
        this.usuarioAtual.set(usuarioSalvo);
        this.exibirMenuManual.set(true);
      }
  }

  geraPass(data: Date, prefixo: string): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');

    return `${prefixo}${dia}${mes}${hora}${minuto}`;
  }

  validaLogin(loginInformado: string, senhaInformada: string): boolean {

    const usuario = this.usuariosValidos.find(u => u.login === loginInformado);

    if (!usuario) {
      return false;
    }

    // Cria duas instâncias de tempo: agora e 1 minuto atrás (tolerância)
    const agora = new Date();
    const umMinutoAtras = new Date(agora.getTime() - 60000);

    // Gera as duas senhas possíveis para o prefixo deste usuário
    const senhaAtual = this.geraPass(agora, usuario.prefixoPass);
    const senhaAnterior = this.geraPass(umMinutoAtras, usuario.prefixoPass);

    return senhaInformada === senhaAtual || senhaInformada === senhaAnterior;
  }

  userIsAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  fazerLogin(user: User) {

    const loginValido = this.validaLogin(user.login, user.senha
    );
    if (loginValido) {
      this.userAuthenticated = true;
      this.mensagemErro.set(null);

      sessionStorage.setItem(this.SESSION_KEY, user.login);
      this.usuarioAtual.set(user.login);

      this.exibirMenuManual.set(true);
      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/home']);
    } else {
      this.mensagemErro.set('Login ou senha inválidos!');
      this.fazerLogout();
    }
  }

  fazerLogout() {
    this.userAuthenticated = false;

    // 1. Limpa o nome salvo no navegador
    sessionStorage.removeItem(this.SESSION_KEY);

    // 2. Reseta os sinais para sumir com o nome e com o menu na hora
    this.usuarioAtual.set(null);
    this.exibirMenuManual.set(false);

    // 3. Avisa os componentes antigos (se necessário) e manda para a tela de login
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']); // ou o caminho da sua rota de login
  }
}
