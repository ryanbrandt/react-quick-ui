# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

### Added

- `Input` accepts an optional `id` for its `<input>` (defaults to a `useId()`
  value).

### Fixed

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
