import { renderAllProviders } from "@/src/utils/renderAllProviders";
import ListMessages from "..";
import { screen } from "@testing-library/react";

describe("<ListMessages />", () => {
  it("should render correctly", () => {
    renderAllProviders(<ListMessages messages={[]} />);
  });

  it("should display a text if there is no messages", () => {
    // Arrange
    renderAllProviders(<ListMessages messages={[]} />);

    // Assert
    expect(screen.getByText("There are no messages")).toBeInTheDocument();
  });
});
