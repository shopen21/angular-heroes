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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => { this.heroes.push(hero); this.selectedHero = null; });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => this.removeHeroFromList(hero));
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
