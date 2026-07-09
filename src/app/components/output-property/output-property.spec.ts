import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputProperty } from './output-property';

describe('OutputProperty', () => {
  let component: OutputProperty;
  let fixture: ComponentFixture<OutputProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputProperty],
    }).compileComponents();

    fixture = TestBed.createComponent(OutputProperty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
