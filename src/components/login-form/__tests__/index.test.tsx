import { renderAllProviders } from "@/src/utils/renderAllProviders";
import LoginForm from "..";
import { useMutation } from "@tanstack/react-query";
import { screen } from "@testing-library/react";

const mockMutation = useMutation as jest.Mock;
describe("<LoginForm />", () => {
  beforeEach(() => {
    mockMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      error: null,
      isError: false,
      isLoading: false,
      isSuccess: false,
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    renderAllProviders(<LoginForm />);
  });

  it("should display 2 inputs with empty values, sign in and google sign in buttons", () => {
    // Arrange
    renderAllProviders(<LoginForm />);

    // Act
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const signInButton = screen.getByRole("button", { name: "Sign In" });
    const googleSignInButton = screen.getByRole("button", {
      name: "Sign In with Google",
    });

    // Assert
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(googleSignInButton).toBeInTheDocument();

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  it("should display a loading text when user submitted", () => {
    // Arrange
    mockMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      isLoading: true,
      isError: false,
      error: null,
      isSuccess: false,
    }));
    renderAllProviders(<LoginForm />);

    // Act
    const loadingButton = screen.getByRole("button", { name: "Loading..." });

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(loadingButton).toBeInTheDocument();
  });

  it("should display an error message if credentials are invalid", () => {
    // Arrange
    mockMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      error: { message: "Credentials Invalid" },
      isError: true,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<LoginForm />);

    // Assert
    expect(screen.getByText("Credentials Invalid")).toBeInTheDocument();
  });

  it("should display an error message if user are disabled", () => {
    // Arrange
    mockMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      error: { message: "User disabled" },
      isError: true,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<LoginForm />);

    // Assert
    expect(screen.getByText("User disabled")).toBeInTheDocument();
  });

  it("should display forgot password", () => {
    // Arrange
    mockMutation.mockImplementation(() => ({
      mutate: jest.fn(),
      error: { message: "User disabled" },
      isError: true,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<LoginForm />);

    // Assert
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });
});
