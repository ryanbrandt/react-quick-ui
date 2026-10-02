# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

The visual redesign starts here (ticket L1, D0 spec direction A
"Evolved"): design tokens, light and dark themes, a variable font and a
restyle of every component. Visual changes are intended.

### Added

- Design tokens as `--rq-*` CSS custom properties: colour, space, radius,
  font family/sizes/weights, line height, letter spacing, shadow, focus
  ring, duration and easing. They ship in the new `stylesheets/tokens.css`
  and are included in `index.css`. Every text colour meets WCAG AA in both
  themes, and control edges (`control-border`, `accent-fill`, the focus
  ring) reach 3:1. `--rq-focus-ring-color`/`-width`/`-offset` let plain CSS
  draw the same focus ring.
- Fluid type tokens for the heading roles: `--rq-font-size-hero`
  (44–72px) and `--rq-font-size-section` (26–32px), a `clamp()` of a
  `rem + vw` value so they follow the reader's font size; and the line
  heights `--rq-line-height-snug` (1.25) and `--rq-line-height-title` (1.3).
- Opt-in light and dark themes. Loading the CSS gives the light tokens and
  sets no `color-scheme`, so the page's canvas, default text and form
  controls are unchanged. `data-theme="light"`, `"dark"` or `"system"`
  (follows the OS) on `<html>` or any other element themes that subtree and
  sets its `color-scheme`; nested themes resolve to the nearest ancestor.
  Apps with a theme toggle should set `data-theme` on `<html>` from it and
  paint `body` with `--rq-color-bg` / `--rq-color-text` (see the README).
  As in 0.6.0-next.0, loading the CSS does not restyle the page itself:
  nothing follows the OS's dark setting until you opt in with
  `data-theme="system"`.
- `stylesheets/fonts.css`: Work Sans as one variable font (weights
  100–900, latin, `font-display: swap`), with its SIL OFL 1.1 license in
  `assets/fonts/work-sans/OFL.txt`.
- Sass API: the token values as maps (`$colors-light`, `$colors-dark`,
  `$space`, `$radii`, `$focus-ring`, `$font-sizes`, …); every flex helper
  as a mixin, listed in `$flex-names`
  (`@include rq.flex--column;`, usable inside `@media`); the
  `text-overflow-ellipsis` and `focus-ring` (optional `$color` and
  `$offset`) mixins; the `control-base` and `control-secondary` mixins
  that Button and IconButton share; `flex--justify-space-evenly`
  and `flex--column--justify-center` (also as `.flex…` classes).
- `TextArea` accepts an optional `id` and links its label to the textarea.
- Storybook: a light/dark/system theme toolbar, the a11y addon and a
  Foundations/Tokens page. `yarn test:visual` screenshots every story in
  both themes and checks each for console errors and axe violations.
- `IconButton`: a 44px icon-only button. `aria-label` is required by its
  type; `variant` `secondary` (outlined) or `ghost`; other `<button>`
  attributes pass through; `type` defaults to `"button"`.
- `Tag`: the spec's pill tag (`text`, `variant` `primary`/`success`/
  `danger`/`warning`/`neutral`, `size` `md`/`lg`, `className`).
- `Card`: title, media, body, tags and footer slots. With `href`, the whole
  card is a link through its title (inner links stay clickable, the focus
  ring outlines the card), and it lifts on hover with `--rq-shadow-lg` (no
  movement under reduced motion). `--rq-card-media-height` (default 168px)
  sets the media height. The card is its own stacking context, so its link
  cover can't paint over a sticky top bar.
- `Heading`: the spec's type scale as the variants `hero` (72px light,
  44px on narrow screens), `section` (32px/26px regular) and `title` (20px
  semibold); `as` picks the element (`h1`–`h6`); `children` can replace
  `text`. `Heading` is now exported from the package entry (it was only
  used by `Modal`).
- `Button`: `variant="secondary"` (the outlined button); `width="auto"`
  to fit the text; `href` (with optional `target`/`rel`) renders a real
  link styled as a button. Each size sets `--rq-button-width` and
  `--rq-button-padding-x`. The redesign's 48px calls to action are
  `size="xlg"` with `width="auto"`.
- `yarn story:create` and `yarn svg:create` refuse a name the package
  already exports, and remind you to add a test.

### Changed

- **Breaking:** `index.css` no longer declares any fonts. Import
  `stylesheets/fonts.css` as well to keep Work Sans (or provide your own
  `"Work Sans"` face). Text otherwise falls back to `system-ui`.
- **Breaking:** the 32 static Work Sans files under
  `assets/fonts/worksans/` are gone (650 KB). Two variable files replace
  them in `assets/fonts/work-sans/` (98 KB; the italic one only downloads
  when used).
- **Breaking (visual):** every component is restyled with the tokens and
  follows the theme:
  - Button: 12px radius, weight 500; primary/success/danger are filled
    with white text, neutral is now an outlined secondary button (3:1
    `control-border` edge); hover
    darkens; `xlg` is 48px tall; a visible keyboard focus ring.
  - Badge: pill shape with tinted backgrounds (primary is the accent tint,
    neutral is outlined).
  - Inputs, TextArea, SearchInput, PasswordInput, EditAndConfirmInput:
    surface background, a 3:1 `control-border` edge, 12px radius, 16px
    text, 14px labels, accent focus ring, red error state; inputs use
    `box-sizing: border-box`.
  - TopBar: bottom border instead of a shadow, 72px tall (was 76px).
  - Modal: rounded card (16px) with a border and shadow over a themed
    scrim. Its enter/exit transition now ends when the CSS animations do,
    instead of after fixed 150/450ms timeouts, so the stylesheet alone sets
    the timing and, under reduced motion, the backdrop goes at once.
  - Heading, LoadingOverlay, SpinnerLoader and the input icons use the
    accent colours; LoadingOverlay's backdrop is a frosted page colour.
  - Font sizes below 13px are raised to 13px.
  - `SearchSvg` strokes with `currentColor` (was `#D6D7E3`).
- **Breaking:** the mixins `input-base`, `input-container`, `input-label`,
  `input-error`, `hr-divider` and `scroll-bar` now emit `var(--rq-*)`
  values, so pages using them need `tokens.css` or `index.css`.
  `input-base` takes an optional `$padding`.
- **Breaking:** `Modal.tsx` no longer exports `BASE_MODAL_TRANSITION_TIMEOUT`
  and `MODAL_ANIMATED_TRANSITION_TIMEOUT` (they were never exported from
  the package entry point).
- **Breaking:** the Sass API forwards the new flex mixins (`flex`,
  `flex--column`, …). A stylesheet that `@forward`s the API next to its
  own mixins of the same names gets a conflict; delete the local copies.
- Transitions and animations respect `prefers-reduced-motion: reduce`:
  the duration tokens drop to 0ms, and the spinner fades instead of
  scaling.
- `_common.scss` is renamed `_flex-utilities.scss` (internal).
- `$work-sans-family` is now the first family of the token font stack
  (still `"Work Sans"`).
- **Breaking (visual):** `Badge` renders a `Tag`: a pill that fits its
  text instead of a set width per size (`lg`/`xlg` give the 14px tag, the
  others the 13px one). The element is a `<span>` (was a `<div>`) with the
  `tag` classes only: the `badge` and `badge--*` classes and their styles
  are gone. To keep styling it from your own stylesheet, pass a class with
  the new `className` prop (e.g. `className="badge"`).
- `Button` wraps its content in `<span>`s instead of `<div>`s (a `<div>`
  isn't allowed inside a `<button>`). It looks the same.

### Deprecated

- The legacy colour variables (`$primary-blue`, …, `sass/_colors.scss`).
  They are unchanged real colours that don't follow the theme; the README
  lists the token that replaces each. They will be removed in a future
  major release.
- The `text-overflow-elipsis` mixin (misspelled). Use
  `text-overflow-ellipsis`; the old name warns and will be removed in a
  future major release.
- `Badge`: use `Tag`. `Badge` is an alias that renders a `Tag` (no runtime
  warning) and will be removed in a future major release.
- `Button`'s `variant="neutral"`: use `"secondary"` (the same style).
- `Button`'s default `width="fixed"`: the default becomes `"auto"` in the
  next major release. Pass `width="fixed"` to keep the set widths.

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
  declarations use inline `type` import modifiers).
- **Breaking:** the peer ranges are now bounded to supported majors: `react` and
  `react-dom` `^18.0.0 || ^19.0.0` (was `>=18.0.0`), `react-transition-group`
  `^4.4.5` (was `>=4.4.5`).
- **Breaking:** the package declares `engines.node` `>=20.19`, so installs on
  older Node warn (npm) or fail (Yarn 1).
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
  styles are unchanged apart from the fixes below.
- The SVG stories' type declarations (`*.stories.d.ts`) are no longer shipped.
- `sideEffects` marks the stylesheets, so bundlers can tree-shake the rest.

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
