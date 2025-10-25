// To appease messy errors related to Link of react-router-dom.
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

import type { ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "sonner";

import { RegisterForm } from "../RegisterForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// --- Helper functions ---

const mockButtonClick = () => {
  const button = screen.getByRole("button", { name: /sign up/i });
  fireEvent.click(button);
};

const enterData = () => {
  fireEvent.change(screen.getByPlaceholderText(/firstname/i), {
    target: { value: "Atvars", name: "firstname" },
  });
  fireEvent.change(screen.getByPlaceholderText(/lastname/i), {
    target: { value: "Vasiljevs", name: "lastname" },
  });
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "atvars_from_lv@euromedia.eu", name: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "23891%jas&^!ladp1293", name: "password" },
  });
};

// Register local toast mock for this test suite.
jest.mock("sonner");

const mockRegister = jest.fn();
jest.mock("../hooks", () => ({
  useRegister: () => ({
    register: mockRegister,
  }),
  useRegisterValidation: jest.fn(),
}));

// --- Import mocked validator ---
import { useRegisterValidation } from "../hooks";

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and submit button is disabled initially.", () => {
    (useRegisterValidation as jest.Mock).mockReturnValue(false);

    render(<RegisterForm />);
    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  it("the button becomes enabled only after entering valid input", () => {
    (useRegisterValidation as jest.Mock).mockReturnValue(true);

    render(<RegisterForm />);
    enterData();

    expect(screen.getByRole("button", { name: /sign up/i })).toBeEnabled();
  });

  it("calls register() hook and displays a success toast notification", async () => {
    (useRegisterValidation as jest.Mock).mockReturnValue(true);

    render(<RegisterForm />);
    enterData();
    mockButtonClick();

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        firstname: "Atvars",
        lastname: "Vasiljevs",
        email: "atvars_from_lv@euromedia.eu",
        password: "23891%jas&^!ladp1293",
      });
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringMatching(
          "We have been sent verification link! Please check your inbox."
        )
      );
    });
  });

  it("displays some error toast, if the server have been refused", async () => {
    mockRegister.mockRejectedValue(new Error("Server refused"));

    render(<RegisterForm />);
    enterData();
    mockButtonClick();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("Registration failed due to")
      );
    });
  });

  it("disables submit button during submission", async () => {
    (useRegisterValidation as jest.Mock).mockReturnValue(true);

    // Delay scenario to test disabled state during await.
    let resolvePromise: () => void;
    const pendingPromise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    mockRegister.mockReturnValueOnce(pendingPromise);

    render(<RegisterForm />);
    enterData();
    mockButtonClick();

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeDisabled();

    resolvePromise!();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
