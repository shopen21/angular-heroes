import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { throwIfAlreadyLoaded } from "./module-import-guard";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [],
    providers: [HeroService],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
