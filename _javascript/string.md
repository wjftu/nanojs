---
sidebar_position: 4
---
# String



Strings in JavaScript are sequences of characters used to represent text.  
They are enclosed in single quotes (`' '`), double quotes (`" "`), or backticks (`` ` ` ``) for template literals.



### Creating Strings

```js
let str1 = 'Hello';
let str2 = "World";
let str3 = `Hello, ${str2}!`; // Template literal
let str4 = String(123);
```

In JavaScript, **single quotes (`' '`) and double quotes (`" "`) are functionally the same** for defining string literals.  
The choice between them is mostly a matter of **coding style and consistency**.

You can **mix quotes** to avoid escaping:

```js
let msg1 = "It's a sunny day";     // avoids escaping single quote
let msg2 = 'He said "Hello"';      // avoids escaping double quotes
```

Convert numbers or other types to strings

```js
let num = 100;
console.log(String(num));    // "100"
console.log(num.toString()); // "100"
```

Convert strings to numbers

```js
console.log(Number("42"));   // 42
console.log(parseInt("42")); // 42
console.log(parseFloat("3.14")); // 3.14
```


### Common String Methods

```js
let text = "JavaScript";

console.log(text.length);       // 10 → Returns string length
console.log(text.toUpperCase()); // JAVASCRIPT → Converts to uppercase
console.log(text.toLowerCase()); // javascript → Converts to lowercase
console.log(text.charAt(4));     // S → Returns character at index
console.log(text.indexOf("S"));  // 4 → Finds index of first occurrence
console.log(text.includes("Script")); // true → Checks if substring exists
console.log(text.slice(0, 4));   // Java → Extracts part of string
console.log(text.replace("Java", "Type")); // TypeScript → Replaces text
console.log(text.trim());        // Removes whitespace
console.log(text.startsWith("java"));  // true
```

In JavaScript, **strings are immutable**, meaning their contents cannot be changed after creation.  
All string methods **return a new string** and **do not modify the original string**.

```js
let str = "Hello";
str[0] = "h"; 
console.log(str); // "Hello" (unchanged)
```

String Splitting and Joining

- `split()` → Converts a string into an array.
- `join()` → Converts an array back to a string.

```js
let str = "apple,banana,cherry";
let arr = str.split(",");
console.log(arr); // ["apple", "banana", "cherry"]
console.log(arr.join(" & ")); // apple & banana & cherry
```

String Padding

- `padStart(targetLength, padString)` → Pads string at start.
- `padEnd(targetLength, padString)` → Pads string at end.

```js
console.log("5".padStart(3, "0")); // "005"
console.log("5".padEnd(3, "*"));   // "5**"
```

### Template Literals

Template literals allow embedded expressions and multi-line strings using backticks.

You can perform **calculations or function calls** inside template literals.

```js
let name = "Alice";
let greeting = `Hello, ${name}! 
Are you ${18+12} years old?`;

console.log(greeting);
```



### Escape Characters

Escape characters are special sequences in JavaScript strings that **allow you to insert characters that are otherwise hard or impossible to type directly**.  
They are represented by a **backslash (`\`) followed by a character**.

```js
let quote = 'It\'s a sunny day';
let path = "C:\\Users\\Admin";
console.log(quote); // It's a sunny day
console.log(path);  // C:\Users\Admin
```

You can represent any character using its **Unicode code point**.

```js
let heart = "\u2764";     // ❤️
let smile = "\u263A";     // ☺
console.log(heart, smile);
```

You can also use hexadecimal values (00–FF).

```js
let symbol = "\x41";  // 'A'
console.log(symbol);
```

In normal string literals, you can split a long string using a backslash:

```js
let message = "This is a long \
string in JavaScript.";
console.log(message);
```

Strings can be searched, validated, or modified using **regex**.

```js
let text = "I have 2 apples and 3 bananas";
let numbers = text.match(/\d+/g);
console.log(numbers); // ["2", "3"]
```

### Comparison


Equality Operators

```js
let str1 = "Hello";
let str2 = "hello";
let str3 = "Hello";

console.log(str1 === str2); // false → case-sensitive
console.log(str1 === str3); // true  → exact match
console.log(str1 !== str2); // true  → not equal
```

`localeCompare()` compares two strings based on the locale and returns:

- `0` → strings are equal
- negative number → first string comes before second
- positive number → first string comes after second

```js
console.log("apple".localeCompare("banana")); // -1
console.log("banana".localeCompare("apple")); // 1
console.log("apple".localeCompare("apple"));  // 0
```

Lexicographical Comparison

Strings can be compared alphabetically using `<`, `>`, `<=`, `>=`:

```js
console.log("apple" < "banana");  // true
console.log("grape" > "grapefruit"); // false
```
This uses Unicode character codes for comparison.

Comparing Strings with `==` in JavaScript

The `==` operator in JavaScript is called **loose equality**. It **compares values after performing type coercion**, meaning it tries to convert operands to the same type before comparing.

```js
let str1 = "Hello";
let str2 = "Hello";
let str3 = "hello";

console.log(str1 == str2); // true → same string
console.log(str1 == str3); // false → case-sensitive
```

When both operands are strings, `==` behaves the same as `===` (strict equality), because no type conversion is needed.

Example with Type Coercion

```js
console.log("123" == 123);  // true  → string is converted to number
console.log("0" == false);  // true  → both converted to number 0
console.log("" == false);   // true  → both converted to number 0
```

This behavior can lead to **unexpected results**, which is why using `==` is generally discouraged in favor of `===`.

The best practice is to use `===` for **safe and predictable string comparisons**.

Summary Table

| Expression       | Result  |
|------------------|---------|
| `"abc" == "abc"` | true    |
| `"123" == 123`   | true    |
| `"0" == false`   | true    |
| `"abc" == "ABC"` | false   |
| `"abc" === "abc"`| true    |
| `"123" === 123`  | false   |

