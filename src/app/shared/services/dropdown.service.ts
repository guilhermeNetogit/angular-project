import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private httpClient: HttpClient) {}

  getEstadosBr(): Observable<any> {
    return this.httpClient.get('/assets/dados/estadosbr.json');
  }

  getCargos(): Observable<any> {
    const cargoControl = [
      {
        name: 'Desenvolvedor',
        cargo: [
          {nome: 'Dev', nivel: 'Junior', salario: 2800},
          {nome: 'Dev', nivel: 'Senior', salario: 3800},
          {nome: 'Dev', nivel: 'Pleno', salario: 4800},
        ],
      },
      {
        name: 'Analista',
        disabled: false,
        cargo: [
          {nome: 'Analista', nivel: 'Junior', salario: 2800},
          {nome: 'Analista', nivel: 'Senior', salario: 3800},
          {nome: 'Analista', nivel: 'Pleno', salario: 4800},
        ],
      }
    ];
    return of(cargoControl);
  }
}
