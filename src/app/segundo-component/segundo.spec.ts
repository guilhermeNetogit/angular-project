import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoComponent } from './segundo';

describe('SegundoComponent', () => {
  let component: SegundoComponent;
  let fixture: ComponentFixture<SegundoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegundoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
