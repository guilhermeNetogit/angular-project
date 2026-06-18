import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segundo } from './segundo';

describe('Segundo', () => {
  let component: Segundo;
  let fixture: ComponentFixture<Segundo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segundo],
    }).compileComponents();

    fixture = TestBed.createComponent(Segundo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
