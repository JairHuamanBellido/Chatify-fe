import { renderAllProviders } from "@/src/utils/renderAllProviders";
import ForgotPasswordHeader from "../components/header";
import { screen } from "@testing-library/react";

describe("<ForgotPasswordHeader />", () => {
  it("should render correctly", () => {
    // Arrange
    renderAllProviders(
      <ForgotPasswordHeader
        description="A description"
        headline="Forgot password?"
        icon={null}
      />
    );

    // Assert
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Forgot password"
    );
    expect(screen.getByText("A description")).toBeInTheDocument();
  });
});
