---
sidebar_position: 5
---

# Props

Props (short for "properties") is component parameters. Props is read-only data passed from parent components to child components in React. They allow components to be dynamic, reusable, and configurable.

Key Characteristics of Props
Read-Only: Props cannot be modified by the child component

* One-Way Data Flow: Data flows from parent to child (unidirectional)  
* Any JavaScript Value: Can pass strings, numbers, arrays, objects, functions, JSX, or even other components  
* TypeScript Support: Can be strongly typed with TypeScript interfaces/types



We can use `interface` and `type` to define props.

Syntax

```ts
// type
type User = {
  name: string
  age: number
}

// interface
interface User {
  name: string
  age: number
}
```

Define a component with props.

```ts
interface BookProps {
  title: string;
  author: string;
  rating?: number;
}
export default function Book(props: BookProps) {
  const {
    title,
    author,
    rating
  } = props;
  return (
    <div>
      <h3>Title: {title}</h3>
      <div>author: {author}</div>
      <div>rating: {rating ?? "unknow"}</div>
    </div>
  )
}


type PeopleProps = {
  name: string
  age: number
}
export default function People(props: PeopleProps) {
  const {
    name,
    age
  } = props
  return (
    <div>
      <h3>People</h3>
      <div>name: {name}</div>
      <div>age: {age}</div>
    </div>
  )
}
```

Pass props to child component

```ts
function App() {
  return (
    <div>
      <Book title='The Lord of the Rings' author='JRR Tolkien' rating={5}/>
    </div>
  )
}
```

`React.ReactNode` is a TypeScript type that represents anything React can render. For example `<div>hello</div>` is a React.ReactNode

```ts
interface ModalProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

function Modal({ header, body, footer }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-header">{header}</div>
      <div className="modal-body">{body}</div>
      <div className="modal-footer">{footer}</div>
    </div>
  );
}

// Parent Component
function App() {
  return (
    <Modal
      header={<h2>Confirm Action</h2>}
      body={<p>Are you sure you want to delete this item?</p>}
      footer={
        <div>
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      }
    />
  );
}

export default App;
```

Passing functions as props

```ts
type ButtonProps = {
  onClick: () => void
}

function MyButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>
}

// In parent component
<MyButton onClick={() => console.log("clicked")} />
```
