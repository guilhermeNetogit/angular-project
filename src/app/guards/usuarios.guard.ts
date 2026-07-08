import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class UsuariosGuard implements CanActivateChild {

  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    const urlDestino = state.url;

    // Se a rota contiver '/edit', barramos qualquer um que não seja o guilherme.neto
    if (urlDestino.includes('/edit')) {
      const usuarioLogado = this.authService.usuarioAtual();

      if (usuarioLogado === 'guilherme.neto') {
        return true;
      }

      // Se não for ele, exibe o aviso e barra a navegação
      alert('Você não tem permissão para editar!');

      // Opcional: Redireciona para a mesma página sem o /edit
      const urlSemEdit = urlDestino.replace('/edit', '');
      this.router.navigateByUrl(urlSemEdit);
      return false;
    }
    return true;
  }
}
