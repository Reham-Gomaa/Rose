import { TestBed } from '@angular/core/testing';

import { CountByCategoryService } from './count-by-category.service';

describe('CountByCategoryService', () => {
  let service: CountByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
