import {
  type FunctionComponent,
  type JSX,
  type ReactNode,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

export interface NavBarProps {
  /**
   * The brand on the left, e.g. a logo linking home
   */
  brand?: ReactNode;

  /**
   * The navigation links, usually `<a>` elements (or a router's links).
   * Give the current page's link `aria-current="page"` to underline it.
   * Narrow bars show them in a menu behind a menu button.
   */
  children?: ReactNode;

  /**
   * Controls on the right that are always visible, e.g. a ThemeToggle
   */
  actions?: ReactNode;

  /**
   * The accessible name of the `<nav>`
   *
   * @default "Primary"
   */
  navLabel?: string;

  /**
   * The accessible name of the menu button on narrow bars
   *
   * @default "Menu"
   */
  menuLabel?: string;

  /**
   * Whether the bar sticks to the top of the page as it scrolls
   *
   * @default true
   */
  sticky?: boolean;

  /**
   * An optional CSS classname to apply to the bar
   */
  className?: string;
}

interface MenuButtonProps {
  // Not `ref`: React 18 doesn't pass `ref` to function components.
  buttonRef: Ref<HTMLButtonElement>;
  label: string;
  controls: string;
  expanded: boolean;
  onClick: () => void;
}

// A hamburger that turns into a cross while the menu is open.
const MenuButton = ({
  buttonRef,
  label,
  controls,
  expanded,
  onClick,
}: MenuButtonProps) => (
  <button
    ref={buttonRef}
    type="button"
    className="navbar__menu-button"
    aria-label={label}
    aria-expanded={expanded}
    aria-controls={controls}
    onClick={onClick}
  >
    <svg
      aria-hidden="true"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
    >
      <path d={expanded ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
    </svg>
  </button>
);

/**
 * The site header: brand, navigation links and actions on a sticky,
 * translucent bar. When the bar is narrower than 768px, the links move into
 * a disclosure menu: a menu button opens it and moves focus to the first
 * link; Esc closes it and returns focus to the button. Choosing a link or
 * clicking outside the bar closes it too.
 */
const NavBar: FunctionComponent<NavBarProps> = (
  props: NavBarProps
): JSX.Element => {
  const {
    brand,
    children,
    actions,
    navLabel = "Primary",
    menuLabel = "Menu",
    sticky = true,
    className = "",
  } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    navRef.current!.querySelector<HTMLElement>("a[href], button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current!.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current!.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    // Following a link closes the menu (the page may not reload).
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) setMenuOpen(false);
    };
    const nav = navRef.current!;

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    nav.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      nav.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  const classNames = createCompositeClassName({
    navbar: true,
    "navbar--sticky": sticky,
    [className]: true,
  });

  return (
    <header ref={headerRef} className={classNames}>
      <div className="navbar__bar">
        {brand && <div className="navbar__brand">{brand}</div>}
        <nav
          ref={navRef}
          id={navId}
          aria-label={navLabel}
          className={createCompositeClassName({
            navbar__nav: true,
            "navbar__nav--open": menuOpen,
          })}
        >
          {children}
        </nav>
        <div className="navbar__actions">
          {actions}
          <MenuButton
            buttonRef={menuButtonRef}
            label={menuLabel}
            controls={navId}
            expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
