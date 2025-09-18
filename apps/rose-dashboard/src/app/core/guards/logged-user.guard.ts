import { CanActivateFn } from '@angular/router';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  return true;
};
