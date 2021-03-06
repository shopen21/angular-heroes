import { Http, Headers } from '@angular/http';
import {Injectable, InjectionToken } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HeroListService } from './hero-list.service';
import { HeroCrudService } from './hero-crud.service';
import { Logger } from './logger.service';

export let HERO_LIST_SERVICE = new InjectionToken<HeroListService>('HeroListService');
export let HERO_CRUD_SERVICE = new InjectionToken<HeroCrudService>('HeroCrudService');

@Injectable()
export class HeroService implements HeroCrudService, HeroListService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private heroesUrl = 'api/heroes';

  constructor(private http: Http, private logger: Logger, private isAuthorized: boolean) {
    this.logger.log('HeroService created');
   }

  public update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  public create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  public remove(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers }).toPromise().then(() => null).catch(this.handleError);
  }

  public getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  public getHeroes(): Promise<Hero[]> {
    this.logger.log(`HeroService.getHeroes ${this.isAuthorized ? 'authorized' : 'guest'}`);
    return this.http.get(this.heroesUrl).toPromise()
    .then(response => (response.json().data as Hero[]).filter(hero => !hero.isSecret || this.isAuthorized))
    .catch(this.handleError);
  }

  public getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error happened', error);
    return Promise.reject(error.message || error);
  }
}
