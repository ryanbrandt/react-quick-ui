import {
  type FunctionComponent,
  type JSX,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

export interface DialogProps {
  /**
   * Whether the dialog is open. The dialog is controlled: set this to
   * `false` in {@link onClose}.
   */
  open: boolean;

  /**
   * Called when the user asks to close the dialog: Esc, the close button,
   * or a click on the backdrop (see {@link closeOnBackdropClick}).
   */
  onClose: () => void;

  /**
   * An optional title, shown as an `<h2>` that labels the dialog
   */
  title?: ReactNode;

  /**
   * The id of the element that labels the dialog. Defaults to the
   * {@link title}'s id when there is a title.
   */
  "aria-labelledby"?: string;

  /**
   * The id of the element that describes the dialog
   */
  "aria-describedby"?: string;

  /**
   * Whether a click on the backdrop (outside the panel) closes the dialog
   *
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * The accessible name of the close (×) button
   *
   * @default "Close"
   */
  closeLabel?: string;

  /**
   * An optional CSS classname to apply to the dialog
   */
  className?: string;

  /**
   * The dialog's content
   */
  children?: ReactNode;
}

const CloseIcon = () => (
  <svg
    aria-hidden="true"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/**
 * A modal dialog on the native `<dialog>` element. While it is open, the
 * browser makes the rest of the page inert (focus can't leave the dialog)
 * and the stylesheet locks page scrolling. Opening moves focus into the
 * dialog; closing returns it to the element that had it before.
 */
const Dialog: FunctionComponent<DialogProps> = (
  props: DialogProps
): JSX.Element => {
  const {
    open,
    onClose,
    title,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    closeOnBackdropClick = true,
    closeLabel = "Close",
    className = "",
    children,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const dialog = dialogRef.current!;
    // The element to return focus to: usually the button that opened it.
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();

    return () => {
      dialog.close();
      trigger?.focus();
    };
  }, [open]);

  // Esc: keep the dialog open until the owner sets `open` to false.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  // The browser closed the dialog itself (a `<form method="dialog">`, or an
  // Esc it wouldn't let us cancel): tell the owner.
  const handleClose = () => {
    if (open) onClose();
  };

  // The panel fills the <dialog>, so a click that targets the <dialog>
  // itself landed on its ::backdrop.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const classNames = createCompositeClassName({
    dialog: true,
    [className]: true,
  });

  return (
    // The backdrop click is a mouse shortcut; Esc (the cancel event) and
    // the close button are its keyboard equivalents.
    // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={classNames}
      aria-labelledby={labelledBy ?? (title ? titleId : undefined)}
      aria-describedby={describedBy}
      onCancel={handleCancel}
      onClose={handleClose}
      onClick={handleClick}
    >
      <div className="dialog__panel">
        {title && (
          <h2 id={titleId} className="dialog__title">
            {title}
          </h2>
        )}
        {children}
        <button
          type="button"
          className="dialog__close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
