import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from '../hero/hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'sho-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let component = this;
    this.route.params
      .switchMap(function (params: Params): Promise<Hero> {
           return component.heroService.getHero(+params.id); })
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }

}
