import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
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
  pagina: number = 1;
  inscricao: Subscription;

  constructor(
    public cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.cursos = this.cursosService.getCursos();

    this.inscricao = this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['pagina']) {
        this.pagina = Number(queryParams['pagina']);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { pagina: 1 },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }

  onAddCurso(nomeCurso: string, descricao: string) {
    if (!nomeCurso.trim()) return;

    const novoCurso: Curso = {
      id: this.cursos.length + 1,
      nomeCurso: nomeCurso,
      descricao: descricao,
    };

    this.cursosService.addCurso(novoCurso);
    this.cursos = this.cursosService.getCursos();
  }

  action(nomeCurso: string) {
    console.log('Curso clicado:', nomeCurso);
  }
}
