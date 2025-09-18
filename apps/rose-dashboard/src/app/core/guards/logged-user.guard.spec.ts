import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedUserGuard } from './logged-user.guard';

describe('loggedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
