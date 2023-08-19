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
    const { container } = render(
      <PasswordPolicyLabel isCorrect={true}>
        At least 1 number
      </PasswordPolicyLabel>
    );

    // Act
    const matchingContainers = container.querySelectorAll(
      '[data-accepted-password-policy="true"]'
    );
    const passwordPolicyText = screen.getByText(/At least 1 number/i);

    // Assert
    expect(matchingContainers).toHaveLength(1);
    expect(passwordPolicyText).toBeInTheDocument();
  });

  it("should display data attribute value when password policy is incorrect", () => {
    // Arrange
    const { container } = render(
      <PasswordPolicyLabel isCorrect={false}>
        At least 1 number
      </PasswordPolicyLabel>
    );

    // Act
    const matchingContainers = container.querySelectorAll(
      '[data-accepted-password-policy="false"]'
    );
    const passwordPolicyText = screen.getByText(/At least 1 number/i);

    // Assert
    expect(matchingContainers).toHaveLength(1);
    expect(passwordPolicyText).toBeInTheDocument();
  });
});
