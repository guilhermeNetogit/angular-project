import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursosComponent } from './cursos';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<CursosComponent[]>(this.API)
      .pipe(
        tap(console.log)
      );
  }
}

