import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { JestUtilities } from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import TopBar from "@stories/TopBar/TopBar";

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);

describe("TopBar", () => {
  const MOCK_CHILD_TEST_ID = "child";
  const MockChildren = () => <div data-testid={MOCK_CHILD_TEST_ID}>Child</div>;

  it("renders the provided children", () => {
    render(
      <TopBar>
        <MockChildren />
      </TopBar>
    );

    expect(screen.getByTestId(MOCK_CHILD_TEST_ID)).toBeInTheDocument();
    expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
      "": true,
      topbar: true,
      "topbar--sticky": false,
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className", () => {
      const mockClassName = "className";

      render(
        <TopBar className={mockClassName}>
          <MockChildren />
        </TopBar>
      );

      expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
        [mockClassName]: true,
        topbar: true,
        "topbar--sticky": false,
      });
    });
  });

  describe("when sticky is true", () => {
    it("stylizes the top bar as sticky", () => {
      render(
        <TopBar sticky>
          <MockChildren />
        </TopBar>
      );

      expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
        "": true,
        topbar: true,
        "topbar--sticky": true,
      });
    });
  });
});
