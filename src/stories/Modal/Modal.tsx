import { FunctionComponent, PropsWithChildren } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

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
}

type Props = PropsWithChildren<BaseProps>;

const Modal: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { children, open, onClose, animated = false, className = "" } = props;

  const modalClassNames = createCompositeClassName({
    [className]: true,
    modal: true,
    "modal--open": open && !animated,
    "modal--closed": !open && !animated,
    "modal--animated-open": open && animated,
    "modal--animated-closed": !open && animated,
  });

  const modalContainerClassNames = createCompositeClassName({
    modal__container: true,
    "modal__container--open": open,
    "modal__container--closed": !open,
  });

  const modalBackgroundClassNames = createCompositeClassName({
    modal__background: true,
    "modal__background--open": open,
    "modal__background--closed": !open,
  });

  return (
    <div className={modalContainerClassNames}>
      <div onClick={onClose} className={modalBackgroundClassNames}>
        <div onClick={(e) => e.stopPropagation()} className={modalClassNames}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
