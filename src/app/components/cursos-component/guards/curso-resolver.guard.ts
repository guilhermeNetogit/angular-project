import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { PeriodicElement } from '../cursos';
import { CursosService } from '../cursos.service';

export const cursoResolver: ResolveFn<PeriodicElement | null> = (route, state) => {
  const service = inject(CursosService);
  const id = route.paramMap.get('id');

  // Retorna os dados se o ID existir, caso contrário retorna null com segurança
  return id ? service.getById(+id) : of(null);
};
