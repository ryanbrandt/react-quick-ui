import { render, screen, within } from "@testing-library/react";

import Card from "@stories/Card/Card";

describe("Card", () => {
  const MOCK_TITLE = "Open FEC GraphQL Server";

  it("renders only the title by default, as an h3", () => {
    const { container } = render(<Card title={MOCK_TITLE} />);

    const article = container.querySelector("article");

    expect(article).toHaveClass("card", { exact: true });
    expect(
      screen.getByRole("heading", { level: 3, name: MOCK_TITLE })
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(article?.children).toHaveLength(1);
  });

  it("renders every slot, with the media last in the markup", () => {
    const { container } = render(
      <Card
        title={MOCK_TITLE}
        headingLevel="h2"
        media={<span data-testid="media">FEC</span>}
        tags={["GraphQL", "Node.js"]}
        footer={<a href="#github">View on GitHub</a>}
        className="extra"
      >
        <p>Description</p>
      </Card>
    );

    const article = container.querySelector("article");

    expect(article).toHaveClass("card extra", { exact: true });
    expect(
      screen.getByRole("heading", { level: 2, name: MOCK_TITLE })
    ).toBeInTheDocument();
    expect(screen.getByText("Description").parentElement).toHaveClass(
      "card__body"
    );
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem")
    ).toHaveLength(2);
    expect(screen.getByText("GraphQL")).toHaveClass("tag");
    expect(screen.getByRole("link", { name: "View on GitHub" })).toBeVisible();
    expect(article?.lastElementChild).toBe(
      screen.getByTestId("media").parentElement
    );
  });

  it("makes the title the card's link when given an href", () => {
    const { container } = render(<Card title={MOCK_TITLE} href="/work/fec" />);

    const link = within(screen.getByRole("heading")).getByRole("link", {
      name: MOCK_TITLE,
    });

    expect(link).toHaveAttribute("href", "/work/fec");
    expect(link).toHaveClass("card__link");
    expect(container.querySelector("article")).toHaveClass("card card--link", {
      exact: true,
    });
  });

  it("renders no tag list for an empty tags array", () => {
    render(<Card title={MOCK_TITLE} tags={[]} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
