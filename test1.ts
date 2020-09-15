function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {

    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}


class B {
    k = 55;
    constructor() { }
}

@classDecorator
class Greeter extends B {
    property = "property";
    hello: string;
    constructor(m: string) {
        super()
        this.hello = m;
    }
}

let a = new Greeter("world")
console.log(a)