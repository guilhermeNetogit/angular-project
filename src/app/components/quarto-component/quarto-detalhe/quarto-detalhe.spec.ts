import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoDetalhe } from './quarto-detalhe';

describe('QuartoDetalhe', () => {
  let component: QuartoDetalhe;
  let fixture: ComponentFixture<QuartoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartoDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(QuartoDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
