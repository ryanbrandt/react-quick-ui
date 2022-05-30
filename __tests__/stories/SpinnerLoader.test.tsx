import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { JestUtilities } from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);

describe("SpinnerLoader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the spinner with the expected classNames", () => {
    render(<SpinnerLoader />);

    expect(mockcreateCompositeClassName).toHaveBeenLastCalledWith({
      "spinner-loader": true,
      "": true,
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className", () => {
      const mockClassName = "className";
      render(<SpinnerLoader className={mockClassName} />);

      expect(mockcreateCompositeClassName).toHaveBeenLastCalledWith({
        "spinner-loader": true,
        [mockClassName]: true,
      });
    });
  });
});
