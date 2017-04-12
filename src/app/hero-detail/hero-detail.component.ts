import { Component, Input, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { HeroCrudService } from '../core/hero-crud.service';
import { HERO_CRUD_SERVICE } from '../core/hero.service';
import { Hero } from '../core/hero';

@Component({
  selector: 'sho-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() prefix = '';

  constructor(
    @Inject(HERO_CRUD_SERVICE) private heroService: HeroCrudService,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const component = this;
    this.route.params
      .switchMap((params: Params) => component.heroService.getHero(+params.id))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }

}
