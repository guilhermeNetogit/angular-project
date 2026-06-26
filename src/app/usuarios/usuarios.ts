import { Component } from '@angular/core';
import { UsuariosDetalhe } from "./usuarios-detalhe/usuarios-detalhe";
import { CursosService } from './services/cursos';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuariosDetalhe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  cursos: string[] = [];

  constructor (public cursosService: CursosService) {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCurso(curso: string) {
    this.cursosService.addCurso(curso);
  }
}
