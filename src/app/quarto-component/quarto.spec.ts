import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartoComponent } from './quarto';

describe('Quarto', () => {
  let component: QuartoComponent;
  let fixture: ComponentFixture<QuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuartoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
