import type { JSX, ChangeEventHandler, ReactNode } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "sonner";

import { RegisterForm } from "../RegisterForm";
import { api } from "@/api/axiosInstance";

/* Helper functions */

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

/* Props defintions */
interface LineInputProps {
  placeholder: string;
  value: string;
  name: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
}

interface SubmitButtonProps {
  label: string;
  disabled: boolean;
}

interface LinkProps {
  children: ReactNode;
  to: string;
  props: [];
}

/* Mocks */

// Mock axios and sonner (toaster) packages.
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock react-router's Link component.
jest.mock("react-router", () => ({
  Link: ({ children, to, ...props }: LinkProps): JSX.Element => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock LineInput local component.
jest.mock("../../common/LineInput", () => ({
  LineInput: ({
    placeholder,
    value,
    name,
    changeHandler,
  }: LineInputProps): JSX.Element => (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={changeHandler}
      data-testid={name}
    />
  ),
}));

// Mock SubmitButton local component.
jest.mock("../../common/SubmitButton", () => ({
  SubmitButton: ({ label, disabled }: SubmitButtonProps): JSX.Element => (
    <button disabled={disabled}>{label}</button>
  ),
}));

// Mock custom Axios instance.
jest.mock("@/api/axiosInstance", () => ({
  api: {
    post: jest.fn(),
  },
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("At the start the 'Sign Up' is turned off", () => {
    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeDisabled();
  });

  it("The button becomes active only after entering valid input", () => {
    render(<RegisterForm />);
    enterData();
    mockButtonClick();
  });

  it("Sends valid data and displays a success toast notification", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Register success." },
    });

    render(<RegisterForm />);

    // Optimize await behavior of sending valid data.
    await act(async () => {
      enterData();
      mockButtonClick();
    });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringMatching(
          "We have been sent verification link! Please check your inbox."
        )
      );
    });
  });

  it("Displays some toast.error, if the server have been refused", async () => {
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: "Document exists." } },
    });

    render(<RegisterForm />);
    enterData();
    mockButtonClick();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
