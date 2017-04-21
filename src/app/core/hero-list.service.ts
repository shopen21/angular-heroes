import { Hero } from './hero';

export interface HeroListService {
    create(name: string): Promise<Hero>;
    remove(id: number): Promise<void>;
    getHeroes(): Promise<Hero[]>;
    getHeroesSlowly(): Promise<Hero[]>;
}
