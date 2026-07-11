import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {
  constructor(private http: HttpClient) {}

  buscarCep(cep: string) {
    const cepLimpo = cep?.replace(/\D/g, '');

    if (cepLimpo && cepLimpo.length === 8) {
      return this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    }

    return of(null);
  }
}
