// To appease messy errors related to Link of react-router-dom.
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

import type { ReactNode } from "react";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "sonner";

import { LoginForm } from "../";

jest.mock("sonner");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockButtonClick = (): void => {
  const button = screen.getByRole("button", { name: "login.button-label" });
  fireEvent.click(button);
};

const enterData = (): void => {
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "atvars_from_lv@euromedia.eu", name: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "23891%jas&^!ladp1293", name: "password" },
  });
};

const mockLogin = jest.fn();
jest.mock("../hooks", () => ({
  useLogin: () => ({ login: mockLogin }),
  useLoginValidation: jest.fn(),
}));

// --- Import mocked validator ---
import { useLoginValidation } from "../hooks";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and submit button is disabled initially.", () => {
    (useLoginValidation as jest.Mock).mockReturnValue(false);
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { name: "login.heading" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "login.button-label" })
    ).toBeDisabled();
  });

  it("enables button when inputs are valid", () => {
    (useLoginValidation as jest.Mock).mockReturnValue(true);
    render(<LoginForm />);
    enterData();
    expect(
      screen.getByRole("button", { name: "login.button-label" })
    ).toBeEnabled();
  });

  it("calls login() hook and shows success toast on successful login", async () => {
    (useLoginValidation as jest.Mock).mockReturnValue(true);
    render(<LoginForm />);
    enterData();
    mockButtonClick();

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "atvars_from_lv@euromedia.eu",
        password: "23891%jas&^!ladp1293",
      });
      expect(toast.success).toHaveBeenCalledWith("login.notification-success");
    });
  });

  it("shows error toast on login failure", async () => {
    (useLoginValidation as jest.Mock).mockReturnValue(true);
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(<LoginForm />);
    enterData();
    mockButtonClick();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("login.notification-error")
      );
    });
  });

  it("disables submit button during submission", async () => {
    (useLoginValidation as jest.Mock).mockReturnValue(true);

    // Delay scenario to test disabled state during await.
    let resolvePromise: () => void;
    const pendingPromise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    mockLogin.mockReturnValueOnce(pendingPromise);

    render(<LoginForm />);
    enterData();
    mockButtonClick();

    const button = screen.getByRole("button", { name: "login.button-label" });
    expect(button).toBeDisabled();

    resolvePromise!();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
