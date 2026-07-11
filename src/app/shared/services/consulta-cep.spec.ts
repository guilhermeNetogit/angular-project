import { TestBed } from '@angular/core/testing';

import { ConsultaCep } from './consulta-cep';

describe('ConsultaCep', () => {
  let service: ConsultaCep;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaCep);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
