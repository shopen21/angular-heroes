import { Hero } from './core/hero';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        const heroes = [
            new Hero(11, 'Mr. Nice', false),
            new Hero(12, 'Narco', true),
            new Hero(13, 'Bombasto', true),
            new Hero(14, 'Celeritas', true),
            new Hero(15, 'Magneta', false),
            new Hero(16, 'RubberMan', false),
            new Hero(17, 'Dynama', false),
            new Hero(18, 'Dr IQ', false),
            new Hero(19, 'Magma', false),
            new Hero(20, 'Tornado', true)
        ];
        return { heroes };
    }
}
