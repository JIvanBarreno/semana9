export class Puppy {
    private id = 0;
    private name = "";
    private raza = 0;

    constructor (id: number, n: string, r: number) {
        this.id = id;
        this.name = n;
        this.raza = r;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getRaza() {
        return this.raza;
    }

    newName(name: string) {
        this.name = name;
    }

    newRaza(raza: number) {
        this.raza = raza;
    }
}