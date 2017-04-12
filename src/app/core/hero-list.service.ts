import { OpaqueToken } from '@angular/core';

import { Hero } from './hero';

export interface HeroListService {
    create(name: string): Promise<Hero>;
    delete(id: number): Promise<void>;
    getHeroes(): Promise<Hero[]>;
    getHeroesSlowly(): Promise<Hero[]>;
}
