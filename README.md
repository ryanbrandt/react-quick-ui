# react-quick-ui

A React component and hooks library for rapid UI development

## Usage

Install the package

```tsx
yarn add @ryanbrandt/react-quick-ui

// or

npm install @ryanbrandt/react-quick-ui
```

Import the distributed stylesheet into the root of your project or a root stylesheet. Both a `css` stylesheet and `scss` stylesheet are provided and can be used interchangeably. The `scss` stylesheet will allow for extension in your project's custom styles.

```tsx
// index.tsx

import "react-quick-ui/stylesheets/index.css";

// or

import "react-quick-ui/stylesheets/index.scss";
```

```scss
// index.scss

@import "react-quick-ui/stylesheets/index.scss;
```

**Warning: Peer Dependencies Required**

1. `react` (>=18.0.0)
2. `react-dom` (>=18.0.0)
3. `react-transition-group` (>=4.4.2)
