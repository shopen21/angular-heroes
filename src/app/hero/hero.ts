export class Hero {
    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    constructor(private _id: number, private _name: string) { }
}
