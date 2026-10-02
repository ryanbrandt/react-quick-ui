import {
  type FunctionComponent,
  type JSX,
  type PropsWithChildren,
  useRef,
} from "react";
import { CSSTransition } from "react-transition-group";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Heading, { type HeadingProps } from "@stories/Heading/Heading";

interface BaseProps {
  /**
   * Flag denoting if the modal is in an open or closed state
   */
  open: boolean;

  /**
   * Handler to be invoked when the background is clicked to trigger
   * the closing of the modal
   */
  onClose: () => void;

  /**
   * Optional flag to stylize the modal with an animated effect
   *
   * @default false
   */
  animated?: boolean;

  /**
   * Optional CSS classname to apply to the modal
   *
   */
  className?: string;

  /**
   * Optional heading data to apply to the modal
   *
   */
  modalHeading?: HeadingProps;
}

export type Props = PropsWithChildren<BaseProps>;

/**
 * Calls `done` once the CSS animations and transitions running on `node` and
 * its panel have finished, so the stylesheet alone sets how long the modal
 * enters and exits (the --rq-duration-* tokens; 0ms under reduced motion).
 * With no animations (or no stylesheet) it calls `done` straight away.
 */
const whenAnimationsEnd = (
  node: HTMLElement | null,
  done: () => void
): void => {
  const animations = [node, node?.firstElementChild]
    .flatMap((element) => element?.getAnimations?.() ?? [])
    // An infinite animation never finishes; don't wait on it.
    .filter(({ effect }) => effect?.getComputedTiming().endTime !== Infinity);

  // A cancelled animation (e.g. an interrupted transition) rejects
  // `finished`, but has stopped either way.
  void Promise.all(
    animations.map(({ finished }) => finished.catch(() => undefined))
  ).then(done);
};

/**
 * @deprecated Use `Dialog`, which is built on the native `<dialog>`: it
 * traps focus, closes on Esc, locks page scrolling and is labelled for
 * screen readers. See "Migrating from Modal to Dialog" in the README.
 * `Modal` will be removed in a future major release.
 */
const Modal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    open,
    onClose,
    modalHeading,
    animated = false,
    className = "",
  } = props;

  // CSSTransition animates this node. Passing it as nodeRef avoids findDOMNode,
  // which React 19 removed.
  const backgroundRef = useRef<HTMLDivElement>(null);

  const modalTransitionClassNames = createCompositeClassName({
    modal__transition: !animated,
    "modal__transition--animated": animated,
  });

  const modalContentClassNames = createCompositeClassName({
    modal: true,
    [className]: true,
  });

  return (
    <CSSTransition
      nodeRef={backgroundRef}
      unmountOnExit
      in={open}
      addEndListener={(done) => whenAnimationsEnd(backgroundRef.current, done)}
      classNames={modalTransitionClassNames}
    >
      {/* Deprecated: no keyboard close. Dialog closes on Esc. */}
      {/* eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions */}
      <div
        ref={backgroundRef}
        onClick={() => onClose()}
        className="modal__background"
      >
        {/* eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={modalContentClassNames}
        >
          {modalHeading && (
            <Heading
              text={modalHeading.text}
              variant={modalHeading.variant}
              className={modalHeading.className}
            />
          )}
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
