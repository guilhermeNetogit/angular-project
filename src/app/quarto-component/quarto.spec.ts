import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quarto } from './quarto';

describe('Quarto', () => {
  let component: Quarto;
  let fixture: ComponentFixture<Quarto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quarto],
    }).compileComponents();

    fixture = TestBed.createComponent(Quarto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
