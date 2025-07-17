---
sidebar_position: 2
---

# Operator

Operators in JavaScript

### Arithmetic Operators  

Perform basic math operations:
| Operator | Example          | Result |
|----------|------------------|--------|
| `+`      | `2 + 3`          | `5`    |
| `-`      | `5 - 2`          | `3`    |
| `*`      | `4 * 2`          | `8`    |
| `/`      | `10 / 2`         | `5`    |
| `%`      | `7 % 3`          | `1`    | (remainder)  
| `**`     | `2 ** 3`         | `8`    | (exponentiation)  

Example 

```js
let a = 2 + 1   // 3
let b = a - 1   // 2
let c = b * 3   // 6
let d = c / 2   // 3
let e = 8 % 3   // 2
let f = 2 ** 3  // 8
```



### Assignment Operators  

Assign or update values:
| Operator | Example        | Meaning                   |
|----------|----------------|---------------------------|
| `=`      | `x = 5`        | Assign 5 to x             |
| `+=`     | `x += 3`       | `x = x + 3`               |
| `-=`     | `x -= 2`       | `x = x - 2`               |
| `*=`     | `x *= 4`       | `x = x * 4`               |
| `/=`     | `x /= 2`       | `x = x / 2`               |

Example:

```js
let x = 5  // 5
x += 3     // 8
x -= 2     // 6
x *= 4     // 24
x /= 2     // 12
```

### Comparison Operators  
Return `true` or `false` by comparing values:
| Operator | Example       | Result                |
|----------|---------------|-----------------------|
| `==`     | `5 == '5'`    | `true` (loose equality)|
| `===`    | `5 === '5'`   | `false` (strict equality)|
| `!=`     | `5 != 10`     | `true`                |
| `!==`    | `5 !== '5'`   | `true`                |
| `<`      | `3 < 5`       | `true`                |
| `>`      | `7 > 2`       | `true`                |
| `<=`     | `4 <= 4`      | `true`                |
| `>=`     | `6 >= 8`      | `false`               |



### Logical Operators  
Work with boolean values:
| Operator | Example           | Meaning             |
|----------|-------------------|---------------------|
| `&&`     | `true && false`   | AND (both true)     |
| `||`     | `true || false`   | OR (any true)       |
| `!`      | `!true`           | NOT (negation)      |
