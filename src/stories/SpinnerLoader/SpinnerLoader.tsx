import { FunctionComponent } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

interface Props {
  /**
   * An optional CSS classname to apply to the loader
   */
  className?: string;
}

const SpinnerLoader: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { className = "" } = props;

  const spinnerLoaderClassNames = createCompositeClassName({
    "spinner-loader": true,
    [className]: true,
  });

  return (
    <div className={spinnerLoaderClassNames}>
      <div className="spinner-loader__circle1" />
      <div className="spinner-loader__circle2" />
      <div className="spinner-loader__circle3" />
      <div className="spinner-loader__circle4" />
      <div className="spinner-loader__circle5" />
      <div className="spinner-loader__circle6" />
      <div className="spinner-loader__circle7" />
      <div className="spinner-loader__circle8" />
      <div className="spinner-loader__circle9" />
      <div className="spinner-loader__circle10" />
      <div className="spinner-loader__circle11" />
      <div className="spinner-loader__circle12" />
    </div>
  );
};

export default SpinnerLoader;
