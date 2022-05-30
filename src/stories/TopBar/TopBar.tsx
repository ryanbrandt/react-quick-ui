import { FunctionComponent, PropsWithChildren } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

interface BaseProps {
  /**
   * Optional flag to configure the header to be sticky
   *
   * @default false
   */
  sticky?: boolean;

  /**
   * An optional CSS classname to apply to the top bar
   */
  className?: string;
}

type Props = PropsWithChildren<BaseProps>;

const TopBar: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { sticky = false, className = "", children } = props;

  const topBarClassNames = createCompositeClassName({
    [className]: true,
    topbar: true,
    "topbar--sticky": sticky,
  });

  return <div className={topBarClassNames}>{children}</div>;
};

export default TopBar;
