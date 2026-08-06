import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface UserConfig {
  username?: string;
  email?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  constructor(private http: HttpClient) {}

  getUserConfig(): Observable<UserConfig> {
    // Certifique-se de que o arquivo user.cfg esteja na pasta src/assets/
    return this.http.get('../../../../environments/users.cfg.ts', { responseType: 'text' }).pipe(
      map((configTexto) => this.parseCfgFile(configTexto))
    );
  }

  // Converte o arquivo .cfg (formato chave=valor) em um objeto JavaScript
  private parseCfgFile(content: string): UserConfig {
    const config: UserConfig = {};
    const linhas = content.split('\n');

    linhas.forEach((linha) => {
      const linhaLimpa = linha.trim();
      if (linhaLimpa && !linhaLimpa.startsWith('#')) {
        const [chave, valor] = linhaLimpa.split('=');
        if (chave && valor) {
          config[chave.trim()] = valor.trim();
        }
      }
    });

    return config;
  }
}
