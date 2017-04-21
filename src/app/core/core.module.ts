import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {HeroService, HERO_CRUD_SERVICE, HERO_LIST_SERVICE} from './hero.service';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {Logger} from './logger.service';
import {heroServiceProvider} from './hero.service.provider';
import {StatesService} from './states.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    heroServiceProvider,
    {provide: HERO_CRUD_SERVICE, useExisting: HeroService},
    {provide: HERO_LIST_SERVICE, useExisting: HeroService},
    Logger,
    StatesService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
