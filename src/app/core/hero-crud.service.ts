import { OpaqueToken } from '@angular/core';

import { Hero } from './hero';

export interface HeroCrudService {
    update(hero: Hero): Promise<Hero>;
    getHero(id: number): Promise<Hero>;
}