// * Decorators
namespace Decorators {
  // * Decorators are a way to add metadata to a class, its members, or its method arguments.

  // const Logger = (constructor: Function) => {
  //   console.log('constructor', constructor);
  // };

  // const Logger = (logString: string) => {
  //   return function (constructor: Function) {
  //     console.log('logString', logString);
  //     console.log('constructor', constructor);
  //   };
  // };

  function Logger(logString: string) {
    return function (constructor: Function) {
      console.log('constructor', constructor);
      console.log(logString);
    };
  }

  function withTemplete(template: string, hookId: string) {
    return function <
      T extends {
        new (...args: any[]): {
          name: string;
        };
      }
    >(originalConstructor: T) {
      return class extends originalConstructor {
        constructor(...args: any[]) {
          super();
          const hookEl = document.getElementById(hookId) as HTMLDivElement;
          hookEl.innerHTML = template;
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = this.name;
          }
        }
      };
    };
  }

  // @Logger('Logging - Person')
  @withTemplete('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...');
    }
  }

  const person = new Person();

  console.log(person);

  console.clear();
  // * Decorators are executed when the class is defined, not when it is instantiated.

  // * Diving into Property Decorators
  // * All decortors execute when the class is defined, not when it is instantiated.

  function Log(target: any, propertyName: string | Symbol) {
    // console.log('Property decorator!');
    // console.log(target, propertyName);
  }

  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    // console.log('Accessor decorator!');
    // console.log(target);
    // console.log(name);
    // console.log(descriptor);
  }

  function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log('Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);

    const originalMethod = descriptor.value;
    const adjacentDescriptor: PropertyDescriptor = {
      configurable: true,
      get: () => {
        return originalMethod.bind('target');
      },
    };

    return adjacentDescriptor;
  }

  function Log4(target: any, name: string | Symbol, position: number) {
    // console.log('Parameter decorator!');
    // console.log(target);
    // console.log(name);
    // console.log(position);
  }

  class Product {
    @Log
    title: string;
    private _price: number;

    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }

    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error('Invalid price - should be positive!');
      }
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
      console.log('this getPric1232eWithTax ', this);
      return this._price * (1 + tax);
    }
  }
  const product = new Product('Hi', 123).getPriceWithTax(123);
}
