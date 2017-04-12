export class Hero {
    name: string;
    id: number;
    isSecret: boolean;

    constructor(id: number, name: string, isSecret: boolean) {
        this.id = id;
        this.name = name;
        this.isSecret = isSecret;
    }
}
