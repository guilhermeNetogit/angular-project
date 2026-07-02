import { Injectable } from '@angular/core';

export interface Curso {
  id: number;
  nomeCurso: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  cursos: Curso[] = [
    {id: 1, nomeCurso: 'JAVA', descricao: 'Programação orientada a objetos com Java.'},
    {id: 2, nomeCurso: 'SQL', descricao: 'Modelagem e manipulação de bancos de dados.' },
    {id: 3, nomeCurso: 'JAVASCRIPT', descricao: 'Desenvolvimento web dinâmico no front-end e back-end.'},
    {id: 4, nomeCurso: 'ANGULAR', descricao: 'Criação de aplicações webSPA robustas com o framework Google.'}
  ];

  getCursos(): Curso[] {
    return this.cursos;
  }

  addCurso(curso: Curso): void {
    this.cursos.push(curso);
  }
}
