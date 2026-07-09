import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDetalhe } from './usuarios-detalhe';

describe('UsuariosDetalhe', () => {
  let component: UsuariosDetalhe;
  let fixture: ComponentFixture<UsuariosDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
