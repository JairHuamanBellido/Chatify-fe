import { renderAllProviders } from "@/src/utils/renderAllProviders";
import ListChatRooms from "..";
import { useQuery } from "@tanstack/react-query";
import { mockChatRooms } from "../__mocks__/index.mock";
import { screen } from "@testing-library/react";

const mockUseQuery = useQuery as jest.Mock;

describe("<ListChatRooms />", () => {
  beforeEach(() => {
    mockUseQuery.mockImplementation(() => ({
      data: {
        data: {
          listChatRooms: {
            items: mockChatRooms,
          },
        },
      },
      isSuccess: true,
      isLoading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render correctly", () => {
    renderAllProviders(<ListChatRooms />);
  });

  it("should display correctly the chatrooms in a table", () => {
    // Arrange
    renderAllProviders(<ListChatRooms />);

    // Act
    const table = screen.getByRole("table");

    // Assert
    expect(table).toBeInTheDocument();
    expect(screen.getByText("My fist chat room")).toBeInTheDocument();
  });

  it("should display a loading text when fetch is in process", () => {
    // Arrange
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      isSuccess: false,
      isLoading: true,
    }));
    renderAllProviders(<ListChatRooms />);

    // Act
    const loadingText = screen.getByText("Loading");

    // Assert
    expect(loadingText).toBeInTheDocument();
  });

  it("should display an error message if fetch fails", () => {
    // Arrange
    mockUseQuery.mockImplementation(() => ({
      data: undefined,
      isSuccess: false,
      isLoading: false,
      isError: true,
    }));
    renderAllProviders(<ListChatRooms />);

    // Act
    const errorText = screen.getByText("Something went wrong!");

    // Assert
    expect(errorText).toBeInTheDocument();
  });
});
