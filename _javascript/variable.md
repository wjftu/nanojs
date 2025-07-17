---
sidebar_position: 1
---

# Variable

Variables in JavaScript

### What are Variables?

Think of variables as named containers for storing data. You can put information into them and then refer to that information later by its name. They are a fundamental concept in programming, allowing you to write flexible and reusable code.

### Declaring Variables

In JavaScript, you "declare" a variable to create it. There are three keywords you can use: `var`, `let`, and `const`.

`let` is the modern and most common way to declare a variable whose value might change later.  

`var` is the original way to declare variables in JavaScript. It has some different scoping rules than let that can sometimes lead to bugs. While you'll see it in older code, it's generally recommended to use let and const in new projects.

`const` is used to declare a variable that will not be reassigned. Its value is constant. This is useful for things that shouldn't change, like the value of Pi or a specific configuration setting.

Example:

```js
var a = 1
let b = 'hello'
const c = true
```

We can reassign a variable that defined by `let` . Here, we first stored "Hello, world!" in the message variable and then updated it with a new value.

```js
let message = "Hello, world!";
console.log(message); // Outputs: Hello, world!

message = "Hello again!";
console.log(message); // Outputs: Hello again!
```

### Data Types

Variables can hold different types of data. JavaScript is dynamically typed, which means you don't have to specify the data type when you declare a variable. The language figures it out automatically.

```js
let a = 1
a = "hello"
a = true
```

Here are the most common data types:

String: Textual data. You can use single quotes, double quotes , or backticks to create strings.

```js
let a = 'hello'
let b = "world"
let c = `hello ${world}` // Backticks allow embedding variables
```

Number: Any numerical value, including integers and decimals.

```js
let age = 30;
let price = 19.99;
```

Boolean: A simple true or false value, often used for conditional logic.

```js 
let a = true
let b = false
```

Null: Represents the intentional absence of any value. It's a value you can assign to a variable to signify it's empty.

```js
let user = null;
```

Undefined: A variable that has been declared but not yet assigned a value has the type undefined.

```js
let a
console.log(a); // Outputs: undefined
```
