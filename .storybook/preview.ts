import type { Decorator, Preview } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import "@styles/fonts.scss";
import "@styles/index.scss";
import "./preview.scss";

import { A11Y_TAGS } from "./a11yTags";

const THEMES = ["light", "dark", "system"];

// The toolbar's theme sets data-theme on the preview's <html>; the --rq-*
// tokens follow it. Set while rendering, so the first paint is themed.
const withTheme: Decorator = (Story, { globals }) => {
  const theme: unknown = globals.theme;
  document.documentElement.dataset.theme =
    typeof theme === "string" && THEMES.includes(theme) ? theme : "light";
  return Story();
};

// Controlled components need their value arg to follow their change handler,
// or the story ignores typing. `parameters.syncArgs` maps each value arg to
// its handler, e.g. `{ value: "onChange" }`: calling the handler still logs
// the action, and also sets the arg to the handler's first argument.
const withSyncedArgs: Decorator = (Story, { args, parameters }) => {
  const [, updateArgs] = useArgs();
  const syncArgs = (parameters.syncArgs ?? {}) as Record<string, string>;

  const handlers = Object.fromEntries(
    Object.entries(syncArgs).map(([valueArg, handlerArg]) => {
      const handler = args[handlerArg] as
        ((...handlerArgs: Array<unknown>) => void) | undefined;
      return [
        handlerArg,
        (value: unknown, ...rest: Array<unknown>) => {
          handler?.(value, ...rest);
          updateArgs({ [valueArg]: value });
        },
      ];
    })
  );

  return Story({ args: { ...args, ...handlers } });
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour theme (sets data-theme on the preview root)",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "system", title: "System", icon: "browser" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [withSyncedArgs, withTheme],
  parameters: {
    layout: "centered",
    a11y: {
      // Report violations as errors, not just in the panel.
      test: "error",
      options: { runOnly: { type: "tag", values: A11Y_TAGS } },
    },
  },
  tags: ["autodocs"],
};

export default preview;
