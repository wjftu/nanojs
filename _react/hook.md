---
sidebar_position: 4
---

# Hook

Hooks are special functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 (February 2019) to allow using state and other React features without writing a class.


**useState**

`useState` is a React Hook that allows function components to manage state. It's one of the most fundamental and commonly used hooks in React!



```ts
import { useState } from 'react';

const [state, setState] = useState(initialValue);
```


* state: The current state value  
* setState: Function to update the state  
* initialValue: Starting value for the state

An example of useState. If you click the number, it will increase in UI.


```ts
function App() {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count+1)}>{count}</div>
  )
}
```

If you directly mutate the variable, React doesn;t know about the change, the component doesn't re-render and the UI stays the same. If you use `setCount` to change it, UI will re-render.

```ts
function App() {
  let count = 0; // ❌ wrong example
  return (
    <div onClick={() => count = count + 1}>{count}</div>
  )
}
```

`useState` in class component

```ts
class App extends React.Component {
  state = {
    count: 0,
  }
  render() {
    return (
      <div onClick={() => this.setState({count: this.state.count + 1})}>{this.state.count}</div>
    )
  }
}
export default App;
```

TypeScript infers type automatically. Also we can specify type manually.

```ts
const [count, setCount] = useState(0)  // count: number
const [name, setName] = useState<string>("")
const [open, setOpen] = useState<boolean>(false)
const [items, setItems] = useState<string[]>([])
type User = {
  name: string
  age: number
}
const [user, setUser] = useState<User | null>(null)
```

Update state of object

React does NOT merge objects automatically. You MUST spread manually.

```ts
setUser(prev => ({
  ...prev!,
  age: prev!.age + 1
}))
```


**useEffect**

`useEffect` lets you run side effects after a render



You can pass a dependency array to useEffect, change of element in array will trigger re-render. Don’t put non-reactive things in it.

```ts
// runs after every render
useEffect(() => {
  console.log("component rendered")
})

// run only ONCE (on mount)
useEffect(() => {
  console.log("only once")
}, [])  // empty array

// run when count changes
useEffect(() => {
  console.log("count changed:", count)
}, [count])
```

`useEffect` is used for cleanup, such as remove event listener, it returns a function for unsubscribe.

```ts
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick")
  }, 1000)

  return () => {
    clearInterval(id)
    console.log("cleanup")
  }
}, [])

```

`useEffect is used for fetching data

```ts
useEffect(() => {
  async function load() {
    const res = await fetch("https://api.example.com/user")
    const data = await res.json()
    setUser(data)
  }

  load()
}, [])

```

useEffect may cause infinite loop

```ts
useEffect(() => {
  setCount(count + 1)  // ❌ this causes infinite re-render
}, [count])
```

**useRef**

`useRef` gives you a mutable box that:

* stores a value in .current
* does NOT cause rerender when .current changes
* survives across renders (like state)

```ts
export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

useRef stores mutable values without rerender

Without useRef, storing renderCount would rerender the component infinitely.

```ts
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```
