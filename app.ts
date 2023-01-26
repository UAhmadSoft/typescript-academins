console.log('Your code asdasd here...');

// add fucntion
function add(a: number, b: number) {
  return a + b;
}

const result = add(1, 22);
console.log('result', result);

console.clear();

// object

const person = {
  name: 'Maximilian',
  age: 30,
};

console.log(person.name);
// console.log('person.address', person.address);

console.clear();

// array
const persons: string[] = [];

persons.push('Max');
console.log('persons', persons);
// persons.push(30);

console.clear();

// tuple
const personTuple: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'],
};

personTuple.role.push('admin');
personTuple.role.push(12);
// personTuple.role[1] = 10;

// personTuple.role = [0, 'admin', 'user'];

console.log('personTuple', personTuple);

console.clear();

// enum
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 'AUTHOR',
}

const personEnum = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

if (personEnum.role === Role.ADMIN) {
  console.log('is admin');
}

console.log('personEnum', personEnum);

console.clear();

// any

// Literal types
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log('combinedAges', combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log('combinedNames', combinedNames);

console.clear();

// Type Aliases
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine2(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges2 = combine2(30, 26, 'as-number');
console.log('combinedAges2', combinedAges2);

const combinedStringAges2 = combine2('30', '26', 'as-number');
console.log('combinedStringAges2', combinedStringAges2);

const combinedNames2 = combine2('Max', 'Anna', 'as-text');
console.log('combinedNames2', combinedNames2);

console.clear();

// Function Return Types & void
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log('result', result);
});

console.clear();

// Unknown Type
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}

console.clear();

// Never Type
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

// const result2 = generateError('An error occurred!', 500);
// console.log('result2', result2);

console.log('hi');

// Nullable Types
let canBeNull: number | null = 12;
canBeNull = null;

// * Classes
class Department extends Error {
  name: string;

  constructor(n: string) {
    super('Error message');
    this.name = n;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');
console.log('accounting', accounting);
// check instanceof
console.log(
  'accounting instanceof Department',
  accounting instanceof Department
);
console.log('accounting instanceof Error', accounting instanceof Error);

console.clear();

// private & public access modifiers
class Department2 {
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department2) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting2 = new Department2('d1', 'Accounting');
console.log('accounting2', accounting2);
accounting2.addEmployee('Max');
accounting2.addEmployee('Manu');

// accounting2.employees[2] = 'Anna';

accounting2.describe();

accounting2.printEmployeeInformation();

console.clear();

// Shortcut initialization
class Department3 {
  // private id: string;
  // private name: string;

  // constructor(id: string, n: string) {
  //   this.id = id;
  //   this.name = n;
  // }

  constructor(private id: string, public name: string) {}

  describe(this: Department3) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
}

console.clear();

// Inheritance
class Department4 {
  constructor(private id: string, public name: string) {}

  describe(this: Department4) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
}

class ITDepartment extends Department4 {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

const it = new ITDepartment('d1', ['Max']);

// overriding

//  * Getters & Setters
class Department5 {
  constructor(private id: string, public name: string) {}

  describe(this: Department5) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  private addReport(text: string) {
    this.lastReport = text;
  }

  private lastReport: string;
}

class ITDepartment2 extends Department5 {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

console.clear();

// Abstract Classes
abstract class Department6 {
  static fiscalYear = 2020;
  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department6): void;

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    // this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    // console.log(this.employees);
  }
}

class ITDepartment3 extends Department6 {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

const employee1 = Department6.createEmployee('Max');
console.log('employee1', employee1);

console.clear();

// Private Constructors & Singletons
class Department7 {
  private static instance: Department7;

  private constructor(public name: string) {}

  static getInstance() {
    if (Department7.instance) {
      return this.instance;
    }
    this.instance = new Department7('Department7');
    return this.instance;
  }

  describe() {
    console.log('Department: ' + this.name);
  }
}

const accounting3 = Department7.getInstance();
const accounting4 = Department7.getInstance();

// Using Interfaces with classes
