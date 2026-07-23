import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { PeriodicElement } from '../cursos';
import { Cursos2Service } from '../cursos2.service';

export const cursoResolver: ResolveFn<PeriodicElement | null> = (route, state) => {
  const service = inject(Cursos2Service);
  const id = route.paramMap.get('id');

  // Retorna os dados se o ID existir, caso contrário retorna null com segurança
  return id ? service.getById(id) : of(null);
};
