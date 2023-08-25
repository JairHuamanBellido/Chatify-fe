import { renderAllProviders } from "@/src/utils/renderAllProviders";
import Sidebar from "..";
import { screen } from "@testing-library/react";

describe("<Sidebar />", () => {
  it("should render correctly", () => {
    // Arrange
    renderAllProviders(<Sidebar />);

    // Assert
    expect(screen.getByRole("menubar")).toBeInTheDocument();
  });
});
