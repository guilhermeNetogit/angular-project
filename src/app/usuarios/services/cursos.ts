import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  getCursos() {
    return ['JAVA', 'SQL', 'JAVASCRIPT', 'ANGULAR', 'SPRING'];
  }
}
