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

The package ships its stylesheets under `@ryanbrandt/react-quick-ui/stylesheets/` (an alias for `dist/stylesheets/`):

| File         | Contents                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `index.css`  | Every component's CSS, the design tokens (same as `tokens.css`) and the `.flex…` utility classes. |
| `tokens.css` | Only the design tokens, as `--rq-*` custom properties.                                            |
| `fonts.css`  | Opt-in Work Sans `@font-face` rules (one variable font, weights 100–900, latin).                  |
| `sass/`      | The Sass API (token maps, colour variables, mixins). Emits no CSS.                                |

Import them once, at the root of your app:

```tsx
// main.tsx
import "@ryanbrandt/react-quick-ui/stylesheets/fonts.css"; // optional, see below
import "@ryanbrandt/react-quick-ui/stylesheets/index.css";
```

**Fonts are opt-in.** `index.css` no longer declares any fonts. Load `fonts.css` to get Work Sans from the package (`font-display: swap`; the font file is about 50 KB, and the italic file loads only if italic text is shown), or provide a `"Work Sans"` font face yourself. Without either, text falls back to `system-ui`. The font is licensed under the SIL Open Font License 1.1, which ships next to it (`assets/fonts/work-sans/OFL.txt`).

### Tokens and theming

Components are styled with design tokens: CSS custom properties prefixed `--rq-`. Use them in your own CSS so it follows the theme too:

```css
.card {
  background: var(--rq-color-surface);
  color: var(--rq-color-text);
  border: 1px solid var(--rq-color-border);
  border-radius: var(--rq-radius-card);
  padding: var(--rq-space-6);
}
```

| Group              | Tokens                                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colour (per theme) | `--rq-color-` `bg`, `surface`, `text`, `muted`, `border`, `control-border`, `tint`, `accent-text`, `accent-fill`, `on-accent`, `brand`, `success-text`/`-tint`/`-fill`, `danger-text`/`-tint`/`-fill`, `warning-text`/`-tint`, `scrim`, `overlay` |
| Space              | `--rq-space-N` (N × 4px: 1–6, 8, 10, 12, 16), `gutter`, `gutter-mobile`, `section`, `section-mobile`, `grid-gap`                                                                                                                                  |
| Radius             | `--rq-radius-control` (12px), `-card` (16px), `-pill`                                                                                                                                                                                             |
| Font               | `--rq-font-family`, `--rq-font-size-` `2xs` (13px) … `6xl` (72px), `--rq-font-weight-` `light`…`bold`, `--rq-line-height-tight`/`-body`, `--rq-letter-spacing-tight`                                                                              |
| Focus ring         | `--rq-focus-ring-color` (per theme: the accent text colour), `--rq-focus-ring-width` (2px), `--rq-focus-ring-offset` (2px)                                                                                                                        |
| Shadow (per theme) | `--rq-shadow-sm`, `--rq-shadow-lg`                                                                                                                                                                                                                |
| Motion             | `--rq-duration-fast`/`-base`/`-slow` (0ms under `prefers-reduced-motion: reduce`), `--rq-easing-standard`/`-emphasized`                                                                                                                           |

Every text colour meets WCAG AA (4.5:1) on its backgrounds in both themes, and the edges of controls (`control-border`, `accent-fill`, the focus ring) reach 3:1 (WCAG 1.4.11). Use `border` for decorative dividers and the edges of cards, and `control-border` for the edge of anything interactive. `brand` (`#7599e6`) is for logos and decoration only. Storybook's "Foundations/Tokens" page lists every value.

**Light and dark.** Theming is opt-in. Loading `index.css` or `tokens.css` on its own gives you the light tokens and sets no `color-scheme`, so the browser's default background, text colour and form controls stay as your app has them. (`index.css` does set the Work Sans `font-family` on the page.) To theme, set `data-theme` on an element:

| `data-theme` | Tokens                                  | `color-scheme`             |
| ------------ | --------------------------------------- | -------------------------- |
| (none)       | light                                   | not set (the page decides) |
| `"light"`    | light                                   | `light`                    |
| `"dark"`     | dark                                    | `dark`                     |
| `"system"`   | follows the OS (`prefers-color-scheme`) | `light` or `dark` to match |

Usually you set it on `<html>`, from your app's theme toggle, so the whole page agrees with the library:

```ts
document.documentElement.dataset.theme = "dark"; // or "light" or "system"
```

Then paint the page from the tokens, since an explicit `color-scheme` changes the browser's default canvas and text:

```css
body {
  background: var(--rq-color-bg);
  color: var(--rq-color-text);
}
```

`data-theme` also works on any element, to theme just that subtree; nested themes resolve to the nearest ancestor's choice (e.g. a `"light"` panel inside a `"dark"` page, or a `"system"` region inside either). It switches the tokens and `color-scheme` there, but not the subtree's own text or background: give that element `color: var(--rq-color-text); background: var(--rq-color-bg)` if it contains your own content.

Values are case-sensitive, and any other value (e.g. `"Dark"` or `"foo"`) is ignored: on `<html>` it behaves like no attribute, and on a nested element it keeps the nearest themed ancestor's theme.

### Sass API

`stylesheets/sass` holds the token values, colour variables and mixins as Sass modules. Loading it emits no CSS, so any number of your stylesheets can `@use` it:

```scss
@use "sass:map";
@use "@ryanbrandt/react-quick-ui/stylesheets/sass" as rq;

.card {
  @include rq.flex--column;
  border: 1px solid var(--rq-color-border);

  &__title {
    @include rq.text-overflow-ellipsis;
  }

  @media (max-width: 600px) {
    @include rq.flex--column--align-center; // mixins work inside @media
  }
}

$faded-accent: rgb(map.get(rq.$colors-light, accent-text), 0.2);
```

It provides:

- token maps (raw values, for compile-time use): `$colors-light`, `$colors-dark`, `$shadows-light`, `$shadows-dark`, `$space`, `$radii`, `$focus-ring`, `$font-family`, `$font-sizes`, `$font-weights`, `$line-heights`, `$letter-spacings`, `$durations` and `$easings`
- **deprecated** legacy colours: `$primary-blue`, `$light-blue`, `$extra-light-blue`, `$black`, `$dark-gray`, `$gray`, `$light-gray`, `$white`, `$green`, `$dark-green`, `$red` and `$yellow`. They are plain colour values, so Sass colour functions keep working, but they don't follow the theme, and they will be removed in a future major release. Use the tokens instead: `$primary-blue` → `--rq-color-brand` (decoration) or `--rq-color-accent-text`/`-fill`; `$white` → `--rq-color-surface`; `$dark-gray`/`$gray` → `--rq-color-muted`/`-border`; `$light-gray` → `--rq-color-bg`; `$green`, `$red`, `$yellow` → the `success-`, `danger-` and `warning-` tokens.
- variables: `$work-sans-family` (the first family of `$font-family`) and `$accordion-transition-time`
- flex mixins: `flex`, `flex--align-center`, `flex--column`, `flex--column--align-center--justify-center` and the rest of the `flex[--column][--align-…][--justify-…]` set, listed in `$flex-names` (the same names as the `.flex…` classes and the `%flex…` placeholders, which can still be extended)
- other mixins: `hr-divider`, `text-overflow-ellipsis`, `user-control-disabled`, `focus-ring` (from the `--rq-focus-ring-*` tokens), `input-container`, `input-base`, `input-label`, `input-error` and `scroll-bar`. These style with the `--rq-*` tokens, so the page needs `tokens.css` or `index.css`. `text-overflow-elipsis` (misspelled) still works but is deprecated.

That path goes through the package's `exports` map, which Vite and Sass's `pkg:` importer (`@use "pkg:@ryanbrandt/react-quick-ui/stylesheets/sass"`) both follow. With a plain `node_modules` load path, use `@ryanbrandt/react-quick-ui/dist/stylesheets/sass` instead.

**Deprecated:** `stylesheets/index.scss` (the compiled CSS with a `.scss` extension) and `stylesheets/colors.scss` (the color variables) still work with `@import`, but Sass `@import` is deprecated and will be removed in Dart Sass 3. Switch to `index.css` and the Sass API above; these two files will be removed in a future major release.

```scss
// Deprecated
@import "@ryanbrandt/react-quick-ui/dist/stylesheets/index.scss";
@import "@ryanbrandt/react-quick-ui/dist/stylesheets/colors.scss";
```

### Content components

**Button.** `variant` is `primary` (filled with `accent-fill`), `secondary` (outlined on the surface colour), `success` or `danger`; `neutral` is the deprecated name of `secondary`. `size` sets the height: `sm` 20px, `md` 30px (default), `lg` 40px, `xlg` 48px. By default each size also has a set width that truncates long text; `width="auto"` fits the text instead (and stretches to fill a column flex layout). Pass `as="a"` with `href` (and optionally `target`, `rel`) to render a real link that looks like a button, with no button role.

The redesign's 48px calls to action are `size="xlg" width="auto"`:

```tsx
<Button as="a" href="/resume" size="xlg" width="auto" text="View résumé" />
<Button as="a" href="/work" size="xlg" width="auto" variant="secondary" text="Personal projects" />
```

**IconButton.** A 44px square, icon-only button. `aria-label` is required (TypeScript enforces it) and names the button; the `icon` is hidden from assistive technology. `variant` is `secondary` (outlined, default) or `ghost` (no background until hovered). Other `<button>` attributes (`onClick`, `aria-expanded`, …) pass through, and `type` defaults to `"button"`.

```tsx
<IconButton aria-label="Open menu" icon={<MenuSvg />} variant="ghost" />
```

**Tag.** A pill label: `text`, `variant` (`primary` tint by default, `success`, `danger`, `warning`, or outlined `neutral`) and `size` (`md`, 13px, for tags on cards; `lg`, 14px, for an eyebrow). **`Badge` is deprecated:** it now renders a `Tag` (with the extra class `badge`, so existing `.badge` rules still match). Its sizes map to `lg` (`lg`, `xlg`) or `md` (the rest), and it fits its text instead of a set width.

**Card.** The project card: `title`, optional `href`, `media`, body (`children`), `tags` (strings, shown as a list of `Tag`s), `footer`, `headingLevel` (default `h3`) and `className`. With `href`, the title is a link whose hit area covers the whole card. Links and buttons inside the card (e.g. in the footer) stay separately clickable, the keyboard focus ring outlines the card, and the card lifts on hover (shadow only under reduced motion). The media renders after the text in the markup, so screen readers reach the title first, but it is shown at the top. Mark decorative media `aria-hidden` (or give an image `alt=""`).

```tsx
<Card
  title="Open FEC GraphQL Server"
  href="/work/open-fec"
  media={<span aria-hidden="true">FEC</span>}
  tags={["GraphQL", "Node.js"]}
  footer={<a href="https://github.com/…">View on GitHub →</a>}
>
  A GraphQL wrapper around the Open FEC API.
</Card>
```

**Heading.** Pass `text`, or `children` for rich content. `as` sets the element (`h1`–`h6`), so the style and the document outline can differ. The spec's type scale adds three variants, in the text colour. Inside them, `<strong>` is semibold in the accent colour (the hero's name).

| `variant`      | Element    | Style                                                                  |
| -------------- | ---------- | ---------------------------------------------------------------------- |
| `hero`         | `h1`       | 72px light (44px on narrow screens, scaling in between), tight leading |
| `section`      | `h2`       | 32px regular (26px on narrow screens)                                  |
| `title`        | `h3`       | 20px semibold (card titles)                                            |
| `h1` (default) | `h1`       | unchanged: 16px bold, centred, accent colour                           |
| `h2`, `h3`     | `h2`, `h3` | unchanged: 14px semibold / light, centred, accent colour               |

The original `h1`/`h2`/`h3` variants keep their look. For new page headings use `hero` for the page title, `section` for section headings and `title` for card or list-item titles.

## Development

- `yarn storybook`: the component explorer, with a light/dark **Theme** toolbar button and the a11y panel.
- `yarn test:coverage` (100% coverage required) and `yarn test:react18`.
- `yarn test:visual`: builds Storybook, then screenshots every story in both themes (exact-pixel comparison) and checks each for console errors and axe violations. Run `yarn test:visual:install` once to install Chromium, `yarn test:visual:run` to rerun against the existing build, and `yarn test:visual:update` to accept intended visual changes. The baseline is recorded on macOS; other platforms need their own.

**Warning: Peer Dependencies Required**

1. `react` (>=18.0.0)
2. `react-dom` (>=18.0.0)
3. `react-transition-group` (>=4.4.2)
