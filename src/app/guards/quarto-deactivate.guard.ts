import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterModule, RouterStateSnapshot } from '@angular/router';
import { QuartoForm } from '../quarto-component/quarto-form/quarto-form';

@Injectable({
  providedIn: 'root'
})
export class QuartoDeactivateGuard implements CanDeactivate<QuartoForm> {

  canDeactivate(
    component: QuartoForm,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    console;console.log('guarda de desativação!');

    return component.podeMudarRota();
  }
}
