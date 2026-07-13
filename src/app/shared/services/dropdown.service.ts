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

  getTechs(): Observable<any> {
    const techList = [
      {nome: 'java', descr: 'Java'},
      {nome: 'js', descr: 'JavaScript'} ,
      {nome: 'ts', descr: 'TypeScript'} ,
      {nome: 'php', descr: 'PHP'},
      {nome: 'angular', descr: 'Angular'},
      {nome: 'sql', descr: 'SQL'}
    ];
    return of(techList);
  }

  getEscolaridade(): Observable<any> {
    const escolaList = [
      {nome: 'efc', descr: 'Fundamental Completo'},
      {nome: 'emc', descr: 'Médio Completo'},
      {nome: 'esc', descr: 'Superior Completo'},
      {nome: 'pgc', descr: 'Pós-Graduação Completa'}
    ];
    return of(escolaList);
  }
}
