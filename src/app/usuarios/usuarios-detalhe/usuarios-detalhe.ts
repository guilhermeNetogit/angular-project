import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Curso, CursosService } from '../services/cursos';

@Component({
  selector: 'app-usuarios-detalhe',
  imports: [MatButtonModule],
  templateUrl: './usuarios-detalhe.html',
  styleUrl: './usuarios-detalhe.scss',
})
export class UsuariosDetalhe {
  @Input() id?: string;

  cursoSelecionado?: Curso;

  constructor(
    private cursosService: CursosService,
    private location: Location,
    private router: Router,
  ) {}

  voltar(): void {
    if (!this.cursoSelecionado) {
      this.router.navigate(['/usuarios'], { queryParams: { pagina: 1 } });
    } else {
      this.location.back();
    }
  }

  ngOnInit() {
    if (this.id) {
      // Converte o ID de string para número
      const idNumero = Number(this.id);

      // Busca a lista de cursos e encontra o correspondente ao ID
      this.cursoSelecionado = this.cursosService.getCursos().find((curso) => curso.id === idNumero);
    }
  }
}
