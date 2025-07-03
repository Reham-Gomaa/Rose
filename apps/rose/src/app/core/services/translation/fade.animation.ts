import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

export const fadeTransition = trigger('fadeTransition', [
 state('hidden', style({ opacity: 0 })),
  state('visible', style({ opacity: 1 })),
  transition('visible => hidden', [animate('5000ms ease-out')]),
  transition('hidden => visible', [animate('5000ms ease-in')])
]);