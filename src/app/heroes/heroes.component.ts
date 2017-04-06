import { Router } from '@angular/router';
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
  heroes: Hero[] = null;
  selectedHero: Hero = null;

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit() {
    this.initializeHeroes();
  }

  select(hero: Hero): void {
    this.selectedHero = hero;
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  private initializeHeroes() {
    this.heroService.getHeroesSlowly().then(
      heroes => this.heroes = heroes,
      reason => this.heroes = []);
  }

}
