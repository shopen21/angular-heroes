import { Component } from '@angular/core';

import { Hero } from './core/hero';
import { HeroService } from './core/hero.service';

@Component({
  selector: 'sho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
