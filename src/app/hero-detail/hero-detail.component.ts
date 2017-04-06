import { Component, Input } from '@angular/core';
import { Hero } from '../hero/hero';

@Component({
  selector: 'sho-hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent {
  @Input() hero: Hero;
  
}
