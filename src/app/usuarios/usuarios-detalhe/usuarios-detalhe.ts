import { Component, Input } from '@angular/core';
import { Curso, CursosService } from '../services/cursos';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarios-detalhe',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './usuarios-detalhe.html',
  styleUrl: './usuarios-detalhe.scss',
})
export class UsuariosDetalhe {
  @Input() id?: string;

  cursoSelecionado?: Curso;

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    if (this.id) {
      // Converte o ID de string para número
      const idNumero = Number(this.id);

      // Busca a lista de cursos e encontra o correspondente ao ID
      this.cursoSelecionado = this.cursosService.getCursos()
        .find(curso => curso.id === idNumero);
    }
  }
}
