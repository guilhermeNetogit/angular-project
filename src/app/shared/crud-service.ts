import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';

export class CrudService<T> {
  constructor(
    protected http: HttpClient,
    protected readonly API_URL: string,
  ) {}

  getList() {
    return this.http.get<T[]>(this.API_URL).pipe(tap(console.log));
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  create(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  update(id: number, record: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record);
  }

  delete(id: number) {
    return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
