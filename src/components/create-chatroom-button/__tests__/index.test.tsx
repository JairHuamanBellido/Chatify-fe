import { renderAllProviders } from "@/src/utils/renderAllProviders";
import CreateChatRoomButton from "..";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const mockUseAuthentication = useAuthenticator as jest.Mock;
const mockUseQuery = useQuery as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;
describe("<CreateChatRoomButton />", () => {
  beforeEach(() => {
    mockUseAuthentication.mockImplementation(() => ({
      user: {
        getSignInUserSession: () => ({
          getIdToken: () => ({
            payload: {
              sub: "my-uuid",
            },
          }),
        }),
      },
    }));
    mockUseQuery.mockImplementation(() => ({
      data: {
        data: {
          getAdmin: {
            id: "my-uuid",
          },
        },
      },
    }));

    mockUseMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isError: false,
      error: null,
      isLoading: false,
      isSuccess: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    renderAllProviders(<CreateChatRoomButton />);
  });

  it("should render a button", () => {
    // Arrange
    renderAllProviders(<CreateChatRoomButton />);

    // Act
    const createButton = screen.getByRole("button", {
      name: "Create Chat room",
    });

    // Assert
    expect(createButton).toBeInTheDocument();
  });

  it("should open a modal when click on button, then display a title , 2 inputs, cancel button and submit button", async () => {
    // Arrange
    renderAllProviders(<CreateChatRoomButton />);

    // Act
    const createButton = screen.getByRole("button", {
      name: "Create Chat room",
    });
    await act(() => {
      fireEvent.click(createButton);
    });

    // Assert
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("New Chat Room")).toBeInTheDocument();
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("should display a loading indicator when user submits", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isError: false,
      error: null,
      isLoading: true,
      isSuccess: false,
    }));
    renderAllProviders(<CreateChatRoomButton />);

    // Act
    const createButton = screen.getByRole("button", {
      name: "Create Chat room",
    });
    await act(() => {
      fireEvent.click(createButton);
    });
    const loadingButton = screen.getByRole("button", {
      name: "Please wait",
    }) as HTMLButtonElement;

    // Assert
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton.disabled).toBeTruthy();
  });

  it("should display an error message if fetch fails", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isError: true,
      error: { message: "Something went wrong!" },
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<CreateChatRoomButton />);

    // Act
    const createButton = screen.getByRole("button", {
      name: "Create Chat room",
    });
    await act(() => {
      fireEvent.click(createButton);
    });

    // Assert
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should display a message if fetch was successfully", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isError: false,
      error: null,
      isLoading: false,
      isSuccess: true,
    }));
    renderAllProviders(<CreateChatRoomButton />);

    // Act
    const createButton = screen.getByRole("button", {
      name: "Create Chat room",
    });
    await act(() => {
      fireEvent.click(createButton);
    });

    // Assert
    expect(screen.getByText('ChatRoom successfully created'))
  });
});
