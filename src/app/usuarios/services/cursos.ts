import { Injectable } from '@angular/core';

export interface Curso {
  id: number;
  nomeCurso: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  cursos: Curso[] = [
    {id: 1, nomeCurso: 'JAVA'},
    {id: 2, nomeCurso: 'SQL'},
    {id: 3, nomeCurso: 'JAVASCRIPT'},
    {id: 4, nomeCurso: 'ANGULAR'}
  ];

  getCursos(): Curso[] {
    return this.cursos;
  }

  addCurso(curso: Curso): void {
    this.cursos.push(curso);
  }
}
