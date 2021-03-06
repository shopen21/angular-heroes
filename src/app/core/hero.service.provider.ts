import {Http} from '@angular/http';

import {HeroService} from './hero.service';
import {Logger} from './logger.service';
import {FactoryProvider} from '@angular/core';

export function heroServiceFactory(http: Http, logger: Logger): HeroService {
  return new HeroService(http, logger, false);
}

export let heroServiceProvider: FactoryProvider = {
  provide: HeroService,
  useFactory: heroServiceFactory,
  deps: [Http, Logger]
};
