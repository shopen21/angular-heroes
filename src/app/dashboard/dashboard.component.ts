import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
    selector: 'sho-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [HeroService]
})
export class DashboardComponent implements OnInit {
    private heroes: Hero[];

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.initializeTopHeroes();
    }

    private initializeTopHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
