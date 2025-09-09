---
sidebar_position: 6
sidebar_label: Method
---

# Method in JavaScript

Method is also called function. A method is a block of code designed to perform a particular task. Method can belong to an object and define behaviors for objects, allowing them to perform actions using their own data. 

Example of some simple common built-in methods

```js
// String methods
let str = "hello";
console.log(str.toUpperCase()); // "HELLO"

// Array methods
let arr = [1, 2, 3];
console.log(arr.push(4)); // 4 (new length)
console.log(arr); // [1, 2, 3, 4]
```

### Define a Method 

Method may have parameter, argument and return statement

- Parameter: a named variable in a function's definition that acts as a placeholder for a value. 
- Argument: the actual value that's passed to the function when it's called.
- Return statement: used to end the execution of a function and send a value back to the code that called it. If a function doesn't have a return statement, or if the return statement is used without a value, the function will return undefined by default.

There are a few ways to define a method:

**Function Declaration:** This is the most common way. You use the `function` keyword, followed by a name, a list of parameters in parentheses, and the code to be executed in curly braces.


```js
function greet(name) {
  return `Hello, ${name}!`;
}

greet('jeff');
```

**Function Expression:** This is when you define a function and assign it to a variable. The function can be anonymous (without a name).

```js
const getProduct = function(a, b) {
  return a * b;
};

const product = getProduct(2, 4);
```

**Arrow Function:** Introduced in ES6, this is a shorter syntax, especially useful for simple functions.

```js
const add = (a, b) => a + b;

const c = add(1, 3);
```

**Function Constructor:** This is generally not recommended because it can be a security risk and is slower than other methods.

```js
const add = new Function('a', 'b', 'return a + b');
const c = add(2, 4);
```

### Method in Object

A method can belong to an object. It can perform actions using the data inside the object (its properties).

```js
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, my name is " + this.name);
  }
};

person.greet(); // Output: Hello, my name is Alice
```

In modern JavaScript (ES6+), you can use shorthand method syntax define methods like this:

```js
const person = {
  name: "Bob",
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
};

person.greet(); // Output: Hi, I am Bob
```

Method can be defined in class for instances

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

const alice = new Person("Alice");
alice.greet(); // Output: Hello, I am Alice
```

### Common build-in method

```js
parseInt("42");       // 42, string to integer
parseFloat("3.14");   // 3.14, string to float
isNaN("abc");         // true, check if not a number
setTimeout(() => console.log("Hello"), 1000); // delay execution
setInterval(() => console.log("Hi"), 1000);  // repeat execution
```