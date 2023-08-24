import { renderAllProviders } from "@/src/utils/renderAllProviders";
import SendMessageInput from "..";
import { screen } from "@testing-library/react";

describe("<SendMessageInput />", () => {
  it("should render correctly", () => {
    renderAllProviders(<SendMessageInput chatRoomId="id-chat" />);
  });

  it("should display an input and submit button", () => {
    // Arrange
    renderAllProviders(<SendMessageInput chatRoomId="id-chat" />);

    // Assert
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button").getAttribute("type")).toBe("submit");
  });
});
