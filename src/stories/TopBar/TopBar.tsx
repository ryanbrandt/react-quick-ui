import type { FunctionComponent, PropsWithChildren, JSX } from "react";

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

/**
 * @deprecated Use `NavBar`: the D0 header with brand, links and actions
 * slots, a translucent sticky bar and a mobile menu. `TopBar` is an empty
 * bar you lay out yourself; it will be removed in a future major release.
 */
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
