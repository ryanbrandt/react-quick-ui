import { FunctionComponent } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";

interface Props {
  /**
   * Flag controlling if the overlay is in a revealed or hidden state
   */
  show: boolean;

  /**
   * An optional message to show within the overlay
   */
  message?: string;

  /**
   * An optional CSS classname to apply to the overlay
   */
  className?: string;
}

const LoadingOverlay: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { show, message, className = "" } = props;

  const overlayClassNames = createCompositeClassName({
    "loading-overlay": true,
    [className]: true,
    "loading-overlay--hidden": !show,
    "loading-overlay--revealed": show,
  });

  return (
    <div className={overlayClassNames}>
      <div className="loading-overlay__content">
        <SpinnerLoader />
        {message && (
          <div className="loading-overlay__content__message">{message}</div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
