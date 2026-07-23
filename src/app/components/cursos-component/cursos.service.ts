import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CrudService } from '../../shared/crud-service';
import { PeriodicElement } from './cursos';

@Injectable({
  providedIn: 'root',
})
export class CursosService extends CrudService<PeriodicElement> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
