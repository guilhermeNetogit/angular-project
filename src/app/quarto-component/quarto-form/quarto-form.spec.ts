import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoForm } from './quarto-form';

describe('QuartoForm', () => {
  let component: QuartoForm;
  let fixture: ComponentFixture<QuartoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(QuartoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
