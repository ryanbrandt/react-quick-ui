import { FunctionComponent, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Heading, { HeadingProps } from "@stories/Heading/Heading";

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

export const BASE_MODAL_TRANSITION_TIMEOUT = 150;

export const MODAL_ANIMATED_TRANSITION_TIMEOUT =
  BASE_MODAL_TRANSITION_TIMEOUT * 3;

const Modal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    open,
    onClose,
    modalHeading,
    animated = false,
    className = "",
  } = props;

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
      unmountOnExit
      in={open}
      timeout={
        animated
          ? MODAL_ANIMATED_TRANSITION_TIMEOUT
          : BASE_MODAL_TRANSITION_TIMEOUT
      }
      classNames={modalTransitionClassNames}
    >
      <div onClick={() => onClose()} className="modal__background">
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
