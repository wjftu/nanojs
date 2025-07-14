---
sidebar_position: 0
---

# JavaScript Quick Start

JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Traditionally, JavaScript ran only in browsers, but Node.js enables it to run on servers.

You can run JavaScript in browsers. Save below html code to a html file, and open it using browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>JavaScript Quick Start</h1>
  

  <script>
    alert("Hello from JavaScript!");
  </script>
</body>
</html>
```

Also you can go to [official Node.js website](https://nodejs.org/) to download and install Node.js

Verify Installation
After installing, verify it works by checking the versions:

```
node -v  # Should show version like v22.x.x
npm -v   # Should show npm version like 10.x.x
```


Create a test.js file 

```js
console.log('hello JavaScript')
```

And run it 

```
node test.js
```