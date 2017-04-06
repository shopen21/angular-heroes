import { HeroService } from 'app/hero/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/hero/hero';

@Component({
  selector: 'sho-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.initializeHeroes();
  }

  private initializeHeroes() {
    this.heroService.getHeroesSlowly().then(
      heroes => this.heroes = heroes,
      reason => this.heroes = []);
  }

}
