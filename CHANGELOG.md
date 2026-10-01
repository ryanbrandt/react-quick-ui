# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

## 0.6.0-next.0 - 2026-10-01

A prerelease (npm tag `next`) for testing in personal-page before 0.6.0.

### Added

- React 19 support. The peer ranges are now `react` and `react-dom`
  `^18.0.0 || ^19.0.0` and `react-transition-group` `^4.4.5`, and the test
  suite runs on both React 18 and 19.
- `Input` accepts an optional `id` for its `<input>` (defaults to a `useId()`
  value).
- A Sass module API that emits no CSS:
  `@use "@ryanbrandt/react-quick-ui/stylesheets/sass" as rq;` exposes the
  colours, variables and mixins.
- An `exports` map: the package entry (`types`, `module`, `default`),
  `./stylesheets/*`, `./assets/*`, `./dist/*` and `./package.json`.

### Changed

- **Breaking:** deep imports must include a file extension (e.g.
  `.../dist/index` no longer resolves); the bare `.../dist` import and
  `README.md` are no longer reachable. Everything under `dist/` with an
  extension still works.
- **Breaking:** TypeScript consumers need TypeScript 4.5 or later (the
  declarations use `import type`).
- **Breaking:** TypeScript consumers need `@types/react` 18.2.6 or later. The
  type declarations now import `JSX` from `react` (React 19 removed the global
  `JSX` namespace).
- **Breaking:** `usePrevious` keeps its values in state instead of a ref. It now
  returns the value before the most recent _change_: a re-render with the same
  value no longer makes it return the current value.
- The legacy `dist/stylesheets/index.scss` and `colors.scss` still work with
  `@import` but are deprecated in favour of `index.css` plus the Sass API.
- The stylesheet is built with the Sass module system and is about 65%
  smaller (the old build repeated the flex utilities 13 times). Resolved
  styles are unchanged.
- Story and test type declarations are no longer shipped.

### Fixed

- `Modal` passes a `nodeRef` to `CSSTransition`, so it no longer relies on
  `findDOMNode` (removed in React 19, deprecated in 18).
- `createCompositeClassName` no longer always includes the first class name
  when its condition is false (e.g. `Modal` with `animated` also got
  `modal__transition`), and no longer adds stray spaces for empty class names.
- Input icons (`EditAndConfirmInput`) now get their styling: `Input` rendered
  `baseInput__icon*` classes, but the stylesheet defines `input__icon*`, and
  the `input__input--with-icon--*` padding was never applied. The icon now
  overlays the padded edge of the input. Inputs without an icon keep their
  existing layout and width.
- The `Input` label is now linked to its input (the `<input>` had no `id`).
- The Work Sans 900 italic `@font-face` declared `font-weight: 200`, so italic
  200 text used the 900 italic file and italic 900 fell back to 800.
