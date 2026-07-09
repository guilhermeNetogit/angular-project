import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipes } from './pipes';

describe('Pipes', () => {
  let component: Pipes;
  let fixture: ComponentFixture<Pipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pipes],
    }).compileComponents();

    fixture = TestBed.createComponent(Pipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
