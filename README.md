# react-quick-ui

A React component + hooks for quick UIs

## Usage

Install the package

```tsx
yarn add @ryanbrandt/react-quick-ui

// or

npm install @ryanbrandt/react-quick-ui
```

It supports React 18 and 19 (peers `react`, `react-dom` and `react-transition-group` 4.4.5+). TypeScript projects need `@types/react` 18.2.6 or later.

### Stylesheets

The package ships two stylesheet entry points under `@ryanbrandt/react-quick-ui/stylesheets/` (an alias for `dist/stylesheets/`).

**Component CSS:** `stylesheets/index.css` is the compiled CSS for every component, plus the Work Sans font faces and the `.flex…` utility classes. Import it once, at the root of your app:

```tsx
// main.tsx
import "@ryanbrandt/react-quick-ui/stylesheets/index.css";
```

**Sass API:** `stylesheets/sass` holds the color tokens, variables and mixins as Sass modules. Loading it emits no CSS, so any number of your stylesheets can `@use` it:

```scss
@use "@ryanbrandt/react-quick-ui/stylesheets/sass" as rq;

.card {
  border: 1px solid rq.$gray;
  color: rq.$primary-blue;

  &__title {
    @include rq.text-overflow-elipsis;
  }
}
```

It provides:

- colors: `$primary-blue`, `$light-blue`, `$extra-light-blue`, `$black`, `$dark-gray`, `$gray`, `$light-gray`, `$white`, `$green`, `$dark-green`, `$red` and `$yellow`
- variables: `$work-sans-family` and `$accordion-transition-time`
- mixins: `hr-divider`, `text-overflow-elipsis`, `user-control-disabled`, `input-container`, `input-base`, `input-label`, `input-error` and `scroll-bar`

That path goes through the package's `exports` map, which Vite and Sass's `pkg:` importer (`@use "pkg:@ryanbrandt/react-quick-ui/stylesheets/sass"`) both follow. With a plain `node_modules` load path, use `@ryanbrandt/react-quick-ui/dist/stylesheets/sass` instead.

**Deprecated:** `stylesheets/index.scss` (the compiled CSS with a `.scss` extension) and `stylesheets/colors.scss` (the color variables) still work with `@import`, but Sass `@import` is deprecated and will be removed in Dart Sass 3. Switch to `index.css` and the Sass API above; these two files will be removed in a future major release.

```scss
// Deprecated
@import "@ryanbrandt/react-quick-ui/dist/stylesheets/index.scss";
@import "@ryanbrandt/react-quick-ui/dist/stylesheets/colors.scss";
```

**Warning: Peer Dependencies Required**

1. `react` (>=18.0.0)
2. `react-dom` (>=18.0.0)
3. `react-transition-group` (>=4.4.2)
