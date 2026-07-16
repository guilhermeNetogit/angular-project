import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursosComponent, PeriodicElement } from './cursos';
import { Observable, take, tap } from 'rxjs';
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

  create(curso: PeriodicElement): Observable<PeriodicElement> {
      return this.http.post<PeriodicElement>(this.API, curso).pipe(take(1));
    }
}

