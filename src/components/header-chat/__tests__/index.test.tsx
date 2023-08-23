import { renderAllProviders } from "@/src/utils/renderAllProviders";
import HeaderChat from "..";
import { screen } from "@testing-library/react";

describe("<HeaderChat />", () => {
  it("should render correctly", () => {
    renderAllProviders(<HeaderChat title="Chatify" />);
  });

  it("should display correctly the title", () => {
    // Arrange
    renderAllProviders(<HeaderChat title="Chatify" />);

    // Assert
    expect(screen.getByText(/Chatify/i)).toBeInTheDocument();
  });
});
