import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

export const fadeTransition = trigger('fadeTransition', [
  state('visible', style({ opacity: 1 })),
 state('hidden', style({ opacity: 0 })),
  transition('hidden <=> visible', [animate('600ms ease-in-out')]),
]);