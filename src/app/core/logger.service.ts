import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
    private logs: string[] = [];

    constructor() {
        this.log('Logger created');
    }

    log(message: string): void {
        this.logs.push(message);
        console.log(message);
    }
}
