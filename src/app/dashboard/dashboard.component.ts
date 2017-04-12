import { Component, OnInit, Inject } from '@angular/core';

import { Hero } from '../core/hero';
import { HeroListService } from '../core/hero-list.service';
import { HERO_LIST_SERVICE } from '../core/hero.service';

@Component({
    selector: 'sho-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[];
    highlightedHero: Hero = null;

    constructor( @Inject(HERO_LIST_SERVICE) private heroService: HeroListService) { }

    ngOnInit(): void {
        this.initializeTopHeroes();
    }

    highlightHero(hero?: Hero): void {
        this.highlightedHero = hero;
    }

    private initializeTopHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
