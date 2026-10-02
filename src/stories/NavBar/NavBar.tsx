import {
  type FunctionComponent,
  type JSX,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import CloseSvg from "@svgs/CloseSvg/CloseSvg";
import MenuSvg from "@svgs/MenuSvg/MenuSvg";

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

// The bar's width below which the links move into the menu: $navbar-narrow
// in _NavBar.scss.
const NARROW_WIDTH = 768;

/**
 * The site header: brand, navigation links and actions on a sticky,
 * translucent bar. When the bar is narrower than 768px, the links move into
 * a disclosure menu: a menu button opens it and moves focus to the first
 * link; Esc in the bar closes it and returns focus to the button, as does
 * choosing a link. Clicking outside the bar or the bar growing wide closes
 * it too.
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

    const header = headerRef.current!;
    // Only an Esc from inside the bar, and not one in a dialog opened from
    // it (a dialog's Esc only becomes cancellable after keydown).
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as Element;
      if (
        event.key !== "Escape" ||
        !header.contains(target) ||
        target.closest("dialog")
      ) {
        return;
      }
      setMenuOpen(false);
      menuButtonRef.current!.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!header.contains(event.target as Node)) setMenuOpen(false);
    };
    // Once the bar is wide, the links are back in it and the menu is gone.
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry!.contentRect.width >= NARROW_WIDTH) setMenuOpen(false);
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    resizeObserver.observe(header);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
    };
  }, [menuOpen]);

  // Following a link closes the menu (the page may not reload). Focus goes
  // to the menu button, since the link it was on is hidden.
  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    if (!menuOpen || !(event.target as Element).closest("a")) return;
    setMenuOpen(false);
    menuButtonRef.current!.focus();
  };

  const classNames = createCompositeClassName({
    navbar: true,
    "navbar--sticky": sticky,
    [className]: true,
  });

  return (
    <header ref={headerRef} className={classNames}>
      <div className="navbar__bar">
        {brand && <div className="navbar__brand">{brand}</div>}
        {/* The click handler only watches link clicks bubbling up, which
            the keyboard makes too. */}
        {/* eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-noninteractive-element-interactions */}
        <nav
          ref={navRef}
          id={navId}
          aria-label={navLabel}
          className={createCompositeClassName({
            navbar__nav: true,
            "navbar__nav--open": menuOpen,
          })}
          onClick={handleNavClick}
        >
          {children}
        </nav>
        <div className="navbar__actions">
          {actions}
          <button
            ref={menuButtonRef}
            type="button"
            className="navbar__menu-button"
            aria-label={menuLabel}
            aria-expanded={menuOpen}
            aria-controls={navId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {/* A hamburger that turns into a cross while the menu is open */}
            {menuOpen ? (
              <CloseSvg aria-hidden="true" width={22} height={22} />
            ) : (
              <MenuSvg aria-hidden="true" width={22} height={22} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
