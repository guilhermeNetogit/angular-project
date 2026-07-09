import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Quarto, QuartoService } from "../services/quarto.service";

@Injectable({ providedIn: 'root' })
export class QuartoDetalheResolver implements Resolve<Quarto[]> {
  constructor(private quartoService: QuartoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Quarto[]>|Promise<Quarto[]>|Quarto[] {
    return this.quartoService.getAll();
  }
}
