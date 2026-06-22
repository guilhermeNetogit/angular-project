import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProperty } from './input-property';

describe('InputProperty', () => {
  let component: InputProperty;
  let fixture: ComponentFixture<InputProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputProperty],
    }).compileComponents();

    fixture = TestBed.createComponent(InputProperty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
