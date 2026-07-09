import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './../login/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log('Verificando autenticação antes de baixar o módulo...');
  const router = inject(Router);

if (authService.userIsAuthenticated()) {
  return true;
}
  return router.createUrlTree(['/login']);
  }
