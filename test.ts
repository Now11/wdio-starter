

function logConstrcutor(target: any) {
    const original = target;
    const constr: any = function (...args) {
        const obj = new original(...args);
        const props = Object.getOwnPropertyNames(obj);
        const proxy = new Proxy(obj, {
            get: function (_t, prop: any) {
                if (props.includes(prop)) {
                    console.log(`Page ${_t.__proto__.constructor.name} call property: ${prop}`);
                    return _t[prop];
                }
                return _t[prop];
            }
        });
        return proxy;
    }
    constr.prototype = original.prototype;
    return constr;
};




class Base {
    protected base_prop: object;
    protected base_a: number
    constructor(base_prop, base_a) {
        this.base_prop = base_prop;
        this.base_a = base_a;
    }

}

@logConstrcutor
class Base1 extends Base {
    private prop1: object;
    private a1: number
    constructor(prop1, a1, prop2, a2) {
        super(prop2, a2)
        this.prop1 = prop1;
        this.a1 = a1;
    }

    method1() {
        const a = this.a1;
        const b = this.prop1
    }

    method2() {
        const a = this.base_prop;
        const b = this.base_a;
    }
}


const a1 = new Base1({ prop1: "asdasd" }, 7, { prop2: "test 2" }, 8)

a1.method1();
console.log("---------------------------");
a1.method2();






// function logConstrcutor1(target: any) {
//     const original = target;

//     const constr: any = function (...args) {
//         const o = new original(...args)
//         const handler = {
//             get: function (_t, prop) {
//                 console.log(`Call prop: ${prop}, from object ${original.name}`)
//                 return o[prop]
//             }
//         }
//         return new Proxy({}, handler);

//     }

//     constr.prototype = original.prototype;
//     return constr;
// }





// const proxy = new Proxy({ aaa: "ggg", kkk: "gas" }, {
//     get: function (_t, prop: any) {
//         console.log(`Object call prop: ${prop}, with value: ${_t[prop]}`);
//         return _t[prop]
//     }
// });

// proxy.aaa;
// proxy.kkk


// function classDecorator(data: any) {
//     return function <T extends { new(...args: any[]): {} }>(constructor: T) {
//         return class extends constructor {
//             newProperty = "new property";
//             hello = "override";
//             // use daat here 
//         }
//     }
// }

// @classDecorator({ data: "" })
// class Greeter {
//     property = "property";
//     hello: string;
//     constructor(m: string) {
//         this.hello = m;
//     }
// }