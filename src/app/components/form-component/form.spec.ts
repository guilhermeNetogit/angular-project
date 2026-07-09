import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerceiroComponent } from './form';

describe('TerceiroComponent', () => {
  let component: TerceiroComponent;
  let fixture: ComponentFixture<TerceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerceiroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerceiroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
