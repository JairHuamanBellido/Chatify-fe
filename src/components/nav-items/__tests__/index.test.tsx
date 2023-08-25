import { renderAllProviders } from "@/src/utils/renderAllProviders";
import NavItems from "..";
import { screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

const mockUsePathname = usePathname as jest.Mock;

describe("<NavItems />", () => {
  beforeEach(() => {
    mockUsePathname.mockImplementation(() => "/dashboard");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    // Arrange
    renderAllProviders(<NavItems />);

    // Assert
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render 1 nav item", () => {
    // Arrange
    renderAllProviders(<NavItems />);

    // Assert
    expect(screen.getAllByRole("menuitem")).toHaveLength(1);
  });

  it('should have only one item the aria-current with "page" as value', () => {
    // Arrange
    renderAllProviders(<NavItems />);

    // Act
    const menuItemActive = screen.getByRole("menuitem", { current: true });

    // Assert
    expect(menuItemActive).toBeInTheDocument();
    expect(menuItemActive).toHaveTextContent("Chats");
  });
});
