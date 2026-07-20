import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PeriodicElement } from './cursos';

@Injectable({
  providedIn: 'root',
})
export class Cursos2Service extends CrudService<PeriodicElement>{
  constructor(http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
