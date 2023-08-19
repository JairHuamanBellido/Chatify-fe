import { renderAllProviders } from "@/src/utils/renderAllProviders";
import RegisterForm from "..";
import { useMutation } from "@tanstack/react-query";
import signUpUserAmplify from "@/src/services/user/mutations/signUpUserAmplify";
import { Auth } from "aws-amplify";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("@/src/services/user/mutations/signUpUserAmplify");
jest.mock("aws-amplify");

const mockUseMutation = useMutation as jest.Mock<any>;

const mocksignUpUserAmplify = signUpUserAmplify as jest.Mock;
const mockAuthSignUpAmplify = Auth.signUp as unknown as jest.Mock;
describe("<RegisterForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render correctly", () => {
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: false,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);
  });

  it("should display 4 inputs with empty values, all password policies should be invalid and button should be disabled", () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: null,
      isLoading: false,
      isSuccess: false,
    }));
    const { container } = renderAllProviders(<RegisterForm />);

    // Act
    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    const passwordPolicies = container.querySelectorAll(
      '[data-accepted-password-policy="false"]'
    );

    const submitButton = container.querySelector(
      "button[type=submit]"
    ) as HTMLButtonElement;

    // Assert
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(repeatPasswordInput.value).toBe("");

    expect(passwordPolicies).toHaveLength(5);

    expect(submitButton.disabled).toBeTruthy();
  });

  it("should be able to click on submit button after all fields were completed ", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: null,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemail@hotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1@" } });
    });

    const submitButton = screen.getByRole("button") as HTMLButtonElement;
    expect(submitButton.disabled).not.toBeTruthy();
  });

  it("should not be able to click on submit button if confirm password missmatch", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: null,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemail@hotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1" } });
    });

    const submitButton = screen.getByRole("button") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should not be able to click on submit button if email is invalid", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: null,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemailhotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1@" } });
    });

    const submitButton = screen.getByRole("button") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should display a loading text when user submitting", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: null,
      isError: null,
      isLoading: true,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    // Act
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemailhotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1@" } });
    });

    const submitButton = screen.getByRole("button") as HTMLButtonElement;

    // Expect
    expect(screen.getByText("Please wait")).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should display an error message from sign up failure", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: { message: "something went wrong!" },
      isError: true,
      isLoading: false,
      isSuccess: false,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    // Act
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemailhotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1@" } });
    });

    // Expect
    expect(screen.getByText("something went wrong!")).toBeInTheDocument();
  });

  it("should display a successfully message after sign up", async () => {
    // Arrange
    mockUseMutation.mockImplementation(() => ({
      mutate: () => null,
      error: false,
      isError: false,
      isLoading: false,
      isSuccess: true,
    }));
    renderAllProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText("name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText(
      "repeat-password"
    ) as HTMLInputElement;

    // Act
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jair" } });
      fireEvent.change(emailInput, {
        target: { value: "myemailhotmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "ABCDfgh1@" } });
      fireEvent.change(repeatPasswordInput, { target: { value: "ABCDfgh1@" } });
    });

    // Expect
    expect(
      screen.getByText("Account was created successfully!")
    ).toBeInTheDocument();
  });
});
