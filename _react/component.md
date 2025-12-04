---
sidebar_position: 3
---

# Component

What are React Components?

React components are independent, reusable pieces of code that return React elements to describe what should appear on the screen. They are the building blocks of React applications.

There are 2 types of component. Function component and Class component. 


Function component

```tsx
function App() {
  return (
    <div></div>
  )
}

export default App
```

Class Components (Legacy, Still Supported)

```ts
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div>hello</div>
    )
  }
}
export default App;
```

Components can have child components

```ts
export default function HelloWorld() {
  return (
    <div>HelloWorld</div>
  )
}


function App() {
  return (
    <div>
      <h1>Title</h1>
      <HelloWorld/>
    </div>
  )
}
export default App
```
