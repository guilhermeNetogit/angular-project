import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { FormDeactivate } from './form-deactivate.guard';

@Injectable({
  providedIn: 'root'
})
export class QuartoDeactivateGuard implements CanDeactivate<FormDeactivate> {

  canDeactivate(
    component: FormDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    console;console.log('guarda de desativação!');

    //return component.podeMudarRota();
    return component.podeDesativar();
  }
}
