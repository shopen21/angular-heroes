import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../core/hero';
import { HERO_LIST_SERVICE } from '../core/hero.service';
import { HeroListService } from '../core/hero-list.service';

@Component({
  selector: 'sho-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = null;
  selectedHero: Hero = null;

  constructor(@Inject(HERO_LIST_SERVICE) private heroService: HeroListService, private router: Router) { }

  ngOnInit() {
    this.initializeHeroes();
  }

  select(hero: Hero): void {
    this.selectedHero = hero;
  }

  goToDetail(): any {
    return this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => { this.heroes.push(hero); this.selectedHero = null; });
  }

  remove(hero: Hero): void {
    this.heroService.remove(hero.id).then(() => this.removeHeroFromList(hero));
  }

  private removeHeroFromList(hero: Hero): void {
      this.heroes = this.heroes.filter(h => h !== hero);
    if (this.selectedHero === hero) {
      this.selectedHero = null;
    }
  }

  private initializeHeroes() {
    this.heroService.getHeroesSlowly().then(
      heroes => this.heroes = heroes,
      reason => this.heroes = []);
  }

}
