// Types the stylesheet side-effect imports in preview.ts, and Vite's
// `?inline` imports (the compiled CSS as a string) in docs/.
declare module "*.scss";

declare module "*.scss?inline" {
  const css: string;
  export default css;
}
