import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogin } from './edit-login';

describe('EditLogin', () => {
  let component: EditLogin;
  let fixture: ComponentFixture<EditLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
