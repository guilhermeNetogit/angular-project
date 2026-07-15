import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursosComponent } from './cursos';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<CursosComponent[]>(this.API)
      .pipe(
        tap(console.log)
      );
  }
}

