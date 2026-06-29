import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Curso, CursosService } from './services/cursos';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatListModule, RouterLink, RouterOutlet],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  cursos: Curso[] = [];

  constructor(public cursosService: CursosService) {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCurso(nomeCurso: string) {
    if (!nomeCurso.trim()) return;

    const novoCurso: Curso = {
      id: this.cursos.length + 1,
      nomeCurso: nomeCurso,
    };

    this.cursosService.addCurso(novoCurso);
    this.cursos = this.cursosService.getCursos();
  }

  action(nomeCurso: string) {
    console.log('Curso clicado:', nomeCurso);
  }
}
