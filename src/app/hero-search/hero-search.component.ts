import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from '../hero/hero';

@Component({
    selector: 'sho-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroSearchService: HeroSearchService) { }

    search(term: string) {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log('Error searching heroes: ', error.message || error);
                return Observable.of<Hero[]>([]);
            });
    }
}
