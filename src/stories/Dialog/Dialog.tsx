import {
  type FunctionComponent,
  type JSX,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import CloseSvg from "@svgs/CloseSvg/CloseSvg";

export interface DialogProps {
  /**
   * Whether the dialog is open. The dialog is controlled: set this to
   * `false` in {@link onClose}.
   */
  open: boolean;

  /**
   * Called when the user asks to close the dialog: Esc, the close button,
   * or a click on the backdrop (see {@link closeOnBackdropClick}). It must
   * set {@link open} to `false`: these only ask, and the dialog stays open
   * until `open` changes. (A dialog the browser closed itself, e.g. by a
   * `<form method="dialog">`, opens again only once `open` has been `false`.)
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

/**
 * A modal dialog on the native `<dialog>` element. While it is open, the
 * browser makes the rest of the page inert (focus can't leave the dialog)
 * and the stylesheet locks page scrolling. Opening moves focus into the
 * dialog; closing returns it to the element that had it before.
 *
 * It is controlled: {@link DialogProps.onClose} must set
 * {@link DialogProps.open} to `false`.
 */
const Dialog: FunctionComponent<DialogProps> = (
  props: DialogProps
): JSX.Element => {
  const {
    open,
    onClose,
    title,
    closeOnBackdropClick = true,
    closeLabel = "Close",
    className = "",
    children,
    // aria-labelledby and aria-describedby
    ...aria
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerDownTarget = useRef<EventTarget | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const dialog = dialogRef.current!;
    dialog.showModal();

    // Closing returns focus to the element that had it before showModal().
    return () => dialog.close();
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
  // itself landed on its ::backdrop. It must have started there too: a
  // text selection dragged out of the panel ends with a click on the
  // backdrop.
  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pointerDownTarget.current = event.target;
  };
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    const { target, currentTarget } = event;
    if (
      closeOnBackdropClick &&
      target === currentTarget &&
      pointerDownTarget.current === currentTarget
    ) {
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
      aria-labelledby={title ? titleId : undefined}
      {...aria}
      onCancel={handleCancel}
      onClose={handleClose}
      onPointerDown={handlePointerDown}
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
          <CloseSvg aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
