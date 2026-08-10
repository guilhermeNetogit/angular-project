import { HttpClient } from '@angular/common/http';
import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { getApp } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firstValueFrom, from, Observable } from 'rxjs';
import { User } from '../user';

export interface UsuarioConfig {
  login: string;
  prefixoPass: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private SESSION_KEY = 'userName';
  private API_URL = '/api/users';

  usuarioAtual = signal<string | null>(sessionStorage.getItem(this.SESSION_KEY));
  exibirMenuManual = signal<boolean>(!!sessionStorage.getItem(this.SESSION_KEY));
  mostrarMenu = computed(() => this.usuarioAtual() !== null || this.exibirMenuManual());
  mensagemErro = signal<string | null>(null);

  private userAuthenticated: boolean = !!sessionStorage.getItem(this.SESSION_KEY);
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private db = getFirestore(getApp(), 'angulardb');

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
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

  async obterDadosCompletosUsuario(login: string): Promise<any> {
    try {
      const q = query(collection(this.db, 'usuarios'), where('login', '==', login));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário no Firestore:', error);
      return null;
    }
  }

  async obterUsuarios(): Promise<UsuarioConfig[]> {
    try {
      return await firstValueFrom(this.http.get<UsuarioConfig[]>(this.API_URL));
    } catch (error) {
      console.error('Erro ao buscar usuários do servidor:', error);
      return [];
    }
  }

  alterarDadosUsuario(
  login: string,
  senhaAtual: string,
  novoNomeUsu?: string,
  novoPrefixo?: string,
): Observable<any> {
  const promessa = (async () => {
    const q = query(collection(this.db, 'usuarios'), where('login', '==', login));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw { status: 404, error: { erro: 'Usuário não encontrado.' } };
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const prefixoSalvo = userData['prefixoPass'] || userData['senha'] || userData['password'];

    if (prefixoSalvo !== senhaAtual) {
      throw { status: 400, error: { erro: 'Senha atual incorreta.' } };
    }

    const dadosAtualizacao: Record<string, any> = {};

    if (novoNomeUsu) {
      dadosAtualizacao['nomeusu'] = novoNomeUsu;
    }

    // Só atualiza a senha no banco se uma nova senha tiver sido digitada
    if (novoPrefixo && novoPrefixo.trim() !== '') {
      dadosAtualizacao['prefixoPass'] = novoPrefixo.trim();
    }

    const userRef = doc(this.db, 'usuarios', userDoc.id);
    await updateDoc(userRef, dadosAtualizacao);

    return { sucesso: true, mensagem: 'Dados atualizados com sucesso!' };
  })();

  return from(promessa);
}

  async validaLogin(login: string, senhaDigitada: string): Promise<boolean> {
    try {
      const q = query(collection(this.db, 'usuarios'), where('login', '==', login));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return false;
      }

      const userData = querySnapshot.docs[0].data();
      const prefixoBanco = userData['prefixoPass'] || userData['senha'] || userData['password'];

      if (!prefixoBanco) {
        return false;
      }

      // Calcula a senha exata esperada: prefixo + (dia + mes + hora + minuto)
      const senhaEsperadaHoraAtual = this.geraPass(new Date(), prefixoBanco);

      // Aceita ESTRITAMENTE a senha completa (prefixo + sufixo dinâmico de data/hora)
      return senhaDigitada === senhaEsperadaHoraAtual;
    } catch (err) {
      console.error('Erro ao validar login no Firestore:', err);
      return false;
    }
  }

  userIsAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  async fazerLogin(user: User): Promise<void> {
    const loginValido = await this.validaLogin(user.login, user.senha);
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

    sessionStorage.removeItem(this.SESSION_KEY);

    this.usuarioAtual.set(null);
    this.exibirMenuManual.set(false);

    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']);
  }
}
