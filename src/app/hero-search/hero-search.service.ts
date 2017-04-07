import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { Hero } from '../core/hero';

@Injectable()
export class HeroSearchService {
    constructor(private http: Http) { }

    search(term: string): Observable<Hero[]> {
        const apiUrl = `app/heroes/?name=${term}`;
        return this.http.get(apiUrl).map(response => response.json().data as Hero[]);
    }
}
