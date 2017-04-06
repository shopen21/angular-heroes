import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { HeroService } from './hero/hero.service';

@Component({
  selector: 'sho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
