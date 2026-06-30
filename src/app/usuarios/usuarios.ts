import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Curso, CursosService } from './services/cursos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatListModule, RouterLink, RouterOutlet],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  cursos: Curso[] = [];
  pagina!: number;
  inscricao: Subscription;

  constructor(
    public cursosService: CursosService,
    private route: ActivatedRoute
  ) {
    this.cursos = this.cursosService.getCursos();

    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.pagina = queryParams['pagina'];
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
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
