import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero/hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'sho-hero-detail',
  templateUrl: './hero-detail.component.html',
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
    this.route.params
    .switchMap((params: Params) => this.heroService.getHero(+params.id))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
