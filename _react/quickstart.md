---
sidebar_position: 2
---

# Quick Start



Node.js is required

```
$ node -v
v24.11.1
$ npm -v
11.6.2
```

Create a react application using vite.

```
npm create vite@latest 

# create with project name and template
npm create vite@latest project-name --template react
```

Preview project

```
npm run dev

  VITE v7.2.4  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open this URL — your app is running!


Project structure

```
my-react-app/
├─ src/
│  ├─ App.tsx # main component
│  ├─ main.tsx # entry point
│  ├─ vite-env.d.ts
│  ├─ assets/ # images etc
├─ index.html # root HTML
├─ tsconfig.json
├─ package.json
├─ vite.config.ts

```

React dependency has been added to package.json

```json
"dependencies": {
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

Open chrome development mode, we can see TypeScript gets converted to JavaScript.

```js
import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d6126ea7";
const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d6126ea7";
const StrictMode = __vite__cjsImport1_react["StrictMode"];
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=d6126ea7";
const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import "/src/index.css";
import App from "/src/App.tsx";
createRoot(document.getElementById("root")).render(/* @__PURE__ */
jsxDEV(StrictMode, {
    children: /* @__PURE__ */
    jsxDEV(App, {}, void 0, false, {
        fileName: "/Users/wjf/wjf/studyworkspace/react-study/src/main.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: "/Users/wjf/wjf/studyworkspace/react-study/src/main.tsx",
    lineNumber: 7,
    columnNumber: 3
}, this));
```
