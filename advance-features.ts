// Intersection Types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

interface ElevatedEmployee extends Admin, Employee {}

// type ElevatedEmployee = Admin & Employee;

type Combinable2 = string | number;
type Numeric = number | boolean;

type Universal = Combinable2 & Numeric;
// * number

// More on Type Guards
function add2(a: Combinable2, b: Combinable2) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

console.clear();

// * Discriminated Unions

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

console.clear();

// * Type Casting

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;

// userInputElement.value = 'Hi there!';

console.clear();

// * Index Properties

interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }
  [prop: string]: string;
}

console.clear();

// * Function Overloads

function add5(a: number, b: number): number;
function add5(a: string, b: string): string;
function add5(a: string, b: number): string;
function add5(a: number, b: string): string;
function add5(a: Combinable2, b: Combinable2) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result2 = add5('Max', ' Schwarz');

console.clear();

// * Optional Chaining

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserData?.job?.title);

console.clear();

// * Nullish Coalescing

const userInput2 = '';

const storedData = userInput2 ?? 'DEFAULT';

console.log(storedData);

console.clear();

// * Generics

const names: Array<string> = []; // string[]

// names[0].split(' ')

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});

console.clear();

// * Generic Functions

function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);
// mergedObj.name;

const merge2 = <T extends {}, U>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// const mergedObj2 = merge2({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
// const mergedObj3 = merge2<{ name: string; hobbies: string[] }, { age: number }>(
//   { name: 'Max', hobbies: ['Sports'] },
//   { age: 30 }
// );

// console.log(mergedObj2);
// console.log(mergedObj3);

console.clear();

// * working with Constraints

// function merge3<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj4 = merge3({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });

// console.log(mergedObj4);

console.clear();

// * Generic Interfaces

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));

console.clear();

// * Keyof Constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

const result5 = extractAndConvert({ name: 'Max' }, 'name');
console.log('result5', result5);

console.clear();

// * Generic Classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');

console.log('textStorage', textStorage);

console.clear();

// * Partial

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  // courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names2: Readonly<string[]> = ['Max', 'Anna'];

console.clear();

// * Readonly

const names3: Readonly<string[]> = ['Max', 'Anna'];
// names3.push('Manu');
// names3.pop();

console.clear();

// * ReadOnly Object

const courseGoal: Readonly<CourseGoal> = {
  title: 'Master TypeScript',
  description: 'Learn TypeScript',
  completeUntil: new Date(),
};

// courseGoal.title = 'Learn TypeScript';
