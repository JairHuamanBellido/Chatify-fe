import { render, screen } from "@testing-library/react";
import PasswordPolicyLabel from "..";

describe("<PasswordPolicyLabel>", () => {
  it("should render correctly", () => {
    render(<PasswordPolicyLabel isCorrect={true}>Test</PasswordPolicyLabel>);
  });

  it("should display text", () => {
    // Arrange
    render(
      <PasswordPolicyLabel isCorrect={true}>
        At least 1 number
      </PasswordPolicyLabel>
    );

    // Act
    const passwordPolicyText = screen.getByText(/At least 1 number/i);

    // Assert
    expect(passwordPolicyText).toBeInTheDocument();
  });

  it("should display data attribute value when password policy is correct", () => {
    // Arrange
    render(
      <PasswordPolicyLabel isCorrect={true}>
        At least 1 number
      </PasswordPolicyLabel>
    );

    // Act
    const parapgraph = screen.getByRole("complementary");
    const passwordPolicyText = screen.getByText(/At least 1 number/i);

    // Assert
    expect(parapgraph).toBeInTheDocument();
    expect(parapgraph).toHaveAttribute("data-accepted-password-policy", "true");
    expect(passwordPolicyText).toBeInTheDocument();
  });

  it("should display data attribute value when password policy is incorrect", () => {
    // Arrange
    render(
      <PasswordPolicyLabel isCorrect={false}>
        At least 1 number
      </PasswordPolicyLabel>
    );

    // Act
    const parapgraph = screen.getByRole("complementary");

    const passwordPolicyText = screen.getByText(/At least 1 number/i);

    // Assert
    expect(parapgraph).toBeInTheDocument();
    expect(parapgraph).toHaveAttribute(
      "data-accepted-password-policy",
      "false"
    );
    expect(passwordPolicyText).toBeInTheDocument();
  });
});
