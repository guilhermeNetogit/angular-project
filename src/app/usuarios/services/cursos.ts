import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  cursos: string[] = ['JAVA', 'SQL', 'JAVASCRIPT', 'ANGULAR', 'SPRING', 'HTML5', 'CSS3'];

  getCursos() {
    return this.cursos;
  }

  addCurso(curso: string) {
    this.cursos.push(curso);
  }
}
