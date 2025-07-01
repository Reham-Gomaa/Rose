import { Component } from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-not-found',
  imports: [ButtonComponent, TranslatePipe, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query(
          '.not-found-image, .not-found-heading, .not-found-message',
          [
            style({ opacity: 0, transform: 'translateY(16px)' }),
            stagger(150, [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class NotFoundComponent {}
