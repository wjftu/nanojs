---
sidebar_position: 3
---
# Control Flow

Control Flow in JavaScript

### What Is Control Flow?
Control flow determines the order in which code is executed.
It lets you make decisions or repeat code using:
1. Conditional statements (`if`, `else`, `switch`)
2. Loops (`for`, `while`, `do...while`)
3. Control keywords (`break`, `continue`, `return`)

---

### 1. Conditional Statements

##### `if`, `else if`, `else`

Run code only when a condition is true.

```js
let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
} else if (age >= 13) {
  console.log("You are a teenager.");
} else {
  console.log("You are a child.");
}
```

---

##### `switch` Statement  
Compare a variable to multiple exact values.

```js
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("You chose apple.");
    break;
  case "banana":
    console.log("You chose banana.");
    break;
  default:
    console.log("Unknown fruit.");
}
```

> Use `break` to prevent fall-through to the next case.

---

### 2. Loops

##### `for` Loop  
Run code a fixed number of times.

```js
for (let i = 0; i < 5; i++) {
  console.log("Count:", i);
}
```

---

##### `while` Loop  
Repeat while a condition is true.

```js
let i = 0;
while (i < 5) {
  console.log("i is", i);
  i++;
}
```

---

##### `do...while` Loop  
Runs at least once before checking the condition.

```js
let i = 0;
do {
  console.log("Number is", i);
  i++;
} while (i < 5);
```

---

### 3. Control Keywords

##### `break`: Exit a loop or switch early
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
```

##### `continue`: Skip the current loop iteration
```js
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
```

If there is a loop in loop, we can use a label to break or continue specific loop

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`i=${i}, j=${j}`);
    if (i === 1 && j === 1) {
      break outer; // breaks the outer loop 
    }
  }
}
```

##### `return`: Exit a function and return a value

---

### ✅ Summary

| Keyword       | Use For                         |
|---------------|----------------------------------|
| `if` / `else` | Run code based on a condition   |
| `switch`      | Match a value to many options   |
| `for`         | Loop a known number of times    |
| `while`       | Loop with a condition           |
| `do...while`  | Like while, but runs once first |
| `break`       | Exit a loop or switch early     |
| `continue`    | Skip this loop step             |
| `return`      | Exit a function                 |
