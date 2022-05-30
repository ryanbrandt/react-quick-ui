import { useLayoutEffect, useState } from "react";

import { IWindowSize } from "@hooks/types";

const useWindowSize = (): IWindowSize => {
  const [size, setSize] = useState<IWindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  });

  useLayoutEffect(() => {
    const updateSize = () => {
      const { innerWidth, innerHeight, outerWidth, outerHeight } = window;

      setSize({ innerWidth, innerHeight, outerWidth, outerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useWindowSize;
