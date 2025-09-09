---
sidebar_position: 7
sidebar_label: Object-Oriented Programming
---

# Object-Oriented Programming (OOP) in JavaScript

Object-oriented programming models code around **objects** (data + behaviour). Key concepts: **encapsulation**, **abstraction**, **inheritance**, **polymorphism**, and **composition**.

### Object literals

A simple object

```js
const person = {
  name: "Alice",
  age: 30,
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
person.sayHi(); // Hi, I'm Alice
```

old style object: Constructor functions + prototypes

```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  console.log(`${this.type} makes a sound`);
};
const dog = new Animal('Dog');
dog.speak();
```

**Why prototypes?** Methods on the prototype are shared by all instances (memory efficient).

ES6 classes

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
const p = new Person('Jeff', 62);
p.sayHi();
```

### Inheritance

The `extends` keyword is used in JavaScript classes to create a **subclass** (child class) from a **parent class** (base class). This allows the child class to **inherit properties and methods** from the parent class. It enables **code reuse** and supports **inheritance**, which is a core concept of OOP.

The `super` keyword is used to **call the parent class’s constructor** or **methods**. It is often used inside the child class’s constructor to initialize values from the parent. Without calling `super(...)`, you cannot use `this` in a child class constructor. `super.methodName()` is used to call a method from the parent class. Once the object is created, you cannot access the parent methods via super from the outside.

```js
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.role} ${this.name}`);
  }
  describe() {
    console.log(`${this.name}, ${this.role}`);
  }
}
const e = new Employee('Jeff', 34, 'Engineer');
e.sayHi(); // Hi, I'm Engineer Jeff
// e.super.sayHi(); Syntax Error
e.describe(); // Jeff, Engineer
console.log(e.name); // Jeff
```

### Encapsulation (private fields & getters/setters)

What is Encapsulation?

- Encapsulation is one of the **core principles of object-oriented programming**.
- It means **hiding the internal state (data) of an object** and only allowing it to be accessed or modified through **well-defined methods**.
- Helps to **protect data from unintended access** and **maintain control over object behavior**.

Benefits of Encapsulation

- **Data protection:** Prevents external code from directly changing internal state.
- **Control access:** You decide which properties or methods are public or private.
- **Flexibility:** Internal implementation can change without affecting external code.
- **Maintainability:** Easier to debug and modify code since access is controlled.

**Using private fields (ES2022+)**

- Prefix a property with `#` to make it **truly private**.
- Can only be accessed within the class.

```js
class BankAccount {
  #balance = 0; // private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    } else {
      console.log("Insufficient funds");
      return 0;
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount("Alice");
acc.deposit(100);
console.log(acc.getBalance()); // 100
// console.log(acc.#balance); // Syntax Error: Private field '#balance' must be declared in an enclosing class
```


**Using getters and setters**

- Provides **controlled access** to properties while keeping the internal representation hidden.

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (newName.length > 0) {
      this.#name = newName;
    } else {
      console.log("Name cannot be empty");
    }
  }
}

const p = new Person("Alice");
console.log(p.name); // Alice
p.name = "Bob";
console.log(p.name); // Bob
p.name = ""; // Name cannot be empty
```

Key Points

- **Private fields (`#`)** are the modern way to enforce encapsulation.
- **Getters and setters** allow controlled access to internal data.
- **Encapsulation improves security, maintainability, and flexibility**.
- External code should **never directly manipulate internal state**; always use methods.

### Polymorphism 

Polymorphism is an **OOP principle** that means **"many forms"** . It allows objects of different classes to be **treated as objects of a common parent class** through **method overriding**. With polymorphism, **the same method name can behave differently** depending on the object that calls it.

**Benefits of Polymorphism**

- **Code reusability:** Same method can be used for different object types.
- **Flexibility:** Functions or methods can work with objects of multiple types.
- **Maintainability:** Adding new subclasses does not require changing existing code that uses the parent class.

Method Overriding

- A **child class provides its own implementation** of a method from the parent class.

```js
class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Cat meows");
  }
}

new Dog().speak(); // Dog barks
new Cat().speak(); // Cat meows
```

Using `super` with overridden methods

- The child can **extend the behavior** of the parent method instead of completely replacing it.

```js
class Dog extends Animal {
  speak() {
    super.speak(); // call parent method
    console.log("Dog barks loudly");
  }
}


new Dog().speak();
// Animal makes a sound
// Dog barks loudly
```

### Composition

What is Composition?

- Composition is an **OOP principle** where objects are **built from smaller, reusable components** instead of inheriting from a parent class.
- It emphasizes **"has-a" relationships** instead of "is-a" relationships.
- The idea is to **combine simple objects** to create more complex behavior rather than relying on deep inheritance hierarchies.

It is a good practice to compose objects (holding instances) instead of deep inheritance chains.  

- **Flexibility:** You can mix and match behaviors without creating deep class chains.
- **Avoids tight coupling:** Inheritance can create fragile code when parent classes change.
- **Code reuse:** Share behaviors between objects without forcing an inheritance relationship.
- **Easier to maintain and test:** Smaller components are easier to understand.



Using Composition

```js
const canEat = {
  eat() {
    console.log(`${this.name} is eating`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

function createPerson(name) {
  const person = { name };
  return Object.assign(person, canEat, canWalk);
}

const alice = createPerson("Alice");
alice.eat();  // Alice is eating
alice.walk(); // Alice is walking
```

`canEat` and `canWalk` are reusable behaviors. `createPerson` composes these behaviors into a single object. No inheritance is used; behaviors can be mixed into any object.



A Car has an Engine and GPS (composition) rather than `Car extends Engine`.

```js
const Engine = {
  start() {
    console.log(`${this.model}'s engine started`);
  }
};

const GPS = {
  navigate(destination) {
    console.log(`Navigating to ${destination}`);
  }
};

function createCar(model) {
  const car = { model };
  return Object.assign(car, Engine, GPS);
}

const myCar = createCar("Tesla");
myCar.start();         // Tesla's engine started
myCar.navigate("Home"); // Navigating to Home
```

### Object Class


In JavaScript, **`Object` is the root class** from which almost all objects inherit. Every object in JS is either created from `Object` **directly** or **indirectly**. It provides **common methods and properties** available to all objects.

Creating Objects

```js
// Using object literal
const obj1 = { a: 1, b: 2 };

// Using Object constructor
const obj2 = new Object();
obj2.a = 1;
obj2.b = 2;
```

Object.prototype Methods

- **toString()** – returns a string representation of the object.
- **hasOwnProperty(prop)** – checks if a property exists directly on the object (not in prototype).
- **valueOf()** – returns the primitive value of the object.
- **isPrototypeOf(obj)** – checks if an object exists in another object’s prototype chain.
- **propertyIsEnumerable(prop)** – checks if a property is enumerable.
- **`Object.create(proto)`** - creates a new object with the specified prototype.
- **`Object.assign()`** - copies enumerable properties from source objects to a target.
- **`Object.keys()`** - Returns an array of the object’s own property names.
- **`Object.values()`** - Returns an array of the object’s own property values.
- **`Object.entries()`** - Returns an array of key-value pairs for each property.

Example:

```js
const obj = { name: "Alice" };
console.log(obj.toString());          // [object Object]
console.log(obj.hasOwnProperty("name")); // true
console.log(obj.hasOwnProperty("age"));  // false
console.log(obj.valueOf());           // { name: 'Alice' }

const proto = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
const person = Object.create(proto);
person.name = "Bob";
person.greet(); // Hello, my name is Bob

const obj2 = { a: 1, b: 2 };
console.log(Object.keys(obj2));   // ['a', 'b']
console.log(Object.values(obj2)); // [1, 2]
console.log(Object.entries(obj2));// [['a',1], ['b',2]]
```