import { screen, render } from "@testing-library/react";

import Heading from "@stories/Heading/Heading";

describe("Heading", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_BASE_CLASS_NAME = "heading";
  const MOCK_TEXT = "text string";
  const MOCK_DEFAULT_VARIANT = "h1";
  it("renders the component with the default variant", () => {
    const { container } = render(<Heading text={MOCK_TEXT} />);

    expect(container.querySelector(MOCK_DEFAULT_VARIANT)).toBeInTheDocument();
    expect(container.querySelector(MOCK_DEFAULT_VARIANT)).toHaveClass(
      `${MOCK_BASE_CLASS_NAME}--${MOCK_DEFAULT_VARIANT} ${MOCK_BASE_CLASS_NAME}`
    );

    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  describe("when the optional props are provided", () => {
    const MOCK_ADDITIONAL_CLASS_NAMES = "additional_class_name";
    const MOCK_VARIANT = "h2";

    it("renders the component with the provided props", () => {
      const { container } = render(
        <Heading
          text={MOCK_TEXT}
          variant={MOCK_VARIANT}
          className={MOCK_ADDITIONAL_CLASS_NAMES}
        />
      );

      expect(container.querySelector(MOCK_VARIANT)).toBeInTheDocument();
      expect(container.querySelector(MOCK_VARIANT)).toHaveClass(
        `${MOCK_ADDITIONAL_CLASS_NAMES} ${MOCK_BASE_CLASS_NAME}--${MOCK_VARIANT} ${MOCK_BASE_CLASS_NAME}`
      );
      expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
    });
  });
});
