import { describe, expect, test } from "vitest";

import { renderWithProviders } from "@/hoc/render-with-providers";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signup from "./signup-form";

describe("Signup Form", () => {
  test("se renderiza el input para nombre de Usuario", () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText(/username/i);
    expect(input).not.toBeNull();
  });
  test("se renderiza el input para email", () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText(/admin@example.com/i);
    expect(input).not.toBeNull();
  });
  test("se renderiza el input para password", () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText(/password/i);
    expect(input).not.toBeNull();
  });
  test("se renderiza el input para confirmar el password", () => {
    renderWithProviders(<Signup />);
    const input = screen.getByPlaceholderText(/confirmar password/i);
    expect(input).not.toBeNull();
  });
  test("se renderiza el botón para hacer submit", () => {
    renderWithProviders(<Signup />);
    const input = screen.getByRole("button", { name: /Signup/i });
    expect(input).not.toBeNull();
  });
  test("Llama al submit con todos los datos de usuario", () => {
    renderWithProviders(<Signup />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/admin@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/confirmar password/i);
    const signupButton = screen.getByRole("button", { name: /Signup/i });

    userEvent.type(usernameInput, "tester");
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "123456");
    userEvent.type(confirmPasswordInput, "123456");
    userEvent.click(signupButton);
  });
});
