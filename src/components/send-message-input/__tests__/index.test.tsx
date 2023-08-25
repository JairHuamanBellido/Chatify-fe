import { renderAllProviders } from "@/src/utils/renderAllProviders";
import SendMessageInput from "..";
import { screen } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";

const mockUseMutation = useMutation as jest.Mock;

describe("<SendMessageInput />", () => {
  beforeEach(() => {
    mockUseMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isLoading: false,
    }));
  });
  it("should render correctly", () => {
    renderAllProviders(<SendMessageInput chatRoomId="id-chat" />);
  });

  it("should display an input and submit button", () => {
    // Arrange
    renderAllProviders(<SendMessageInput chatRoomId="id-chat" />);

    // Assert
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
