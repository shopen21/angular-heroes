import {Injectable} from "@angular/core";

const STATES = ['CA', 'TX', 'AK', 'SF', 'WY'];

@Injectable()
export class StatesService {
  getStates(): Promise<string[]> {
    return Promise.resolve(STATES);
  }
}
