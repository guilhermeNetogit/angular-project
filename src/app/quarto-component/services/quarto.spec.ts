import { TestBed } from '@angular/core/testing';

import { Quarto } from './quarto.service';

describe('Quarto', () => {
  let service: Quarto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quarto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
