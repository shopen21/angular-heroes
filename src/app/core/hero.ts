import {Address} from "app/core/address";
export class Hero {
    name: string;
    id: number;
    isSecret: boolean;
    addresses: Address[];

    constructor(id: number, name: string, isSecret: boolean, addresses?: Address[]) {
        this.id = id;
        this.name = name;
        this.isSecret = isSecret;
        this.addresses = addresses || [];
    }
}
