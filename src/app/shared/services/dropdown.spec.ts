import { TestBed } from '@angular/core/testing';

import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  let service: Dropdown;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dropdown);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
