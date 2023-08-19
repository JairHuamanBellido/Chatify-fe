import { render, screen } from "@testing-library/react";
import TypographyMuted from "../muted";
import { TypographySmall } from "../small";

describe("<TypographyMuted />", () => {
  it("should render correctly", () => {
    render(<TypographyMuted>A sample text</TypographyMuted>);
  });

  it("should display text correctly", () => {
    // Arrange
    render(<TypographyMuted>A sample text</TypographyMuted>);

    // Act
    const passwordPolicyText = screen.getByText(/A sample text/i);

    // Assert
    expect(passwordPolicyText).toBeInTheDocument();
  });
});
describe("<TypographySmall />", () => {
  it("should render correctly", () => {
    render(<TypographySmall>A sample text</TypographySmall>);
  });

  it("should display text correctly", () => {
    // Arrange
    render(<TypographySmall>A sample text</TypographySmall>);

    // Act
    const passwordPolicyText = screen.getByText(/A sample text/i);

    // Assert
    expect(passwordPolicyText).toBeInTheDocument();
  });
});
