import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../Pages/Register";

describe("Register component", () => {
  test("should render the component", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByText("Welcome to Deliorder")).toBeInTheDocument();
  });

  test("should display form errors on invalid input", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText("Name   (Eg. John Doe)");
    const phoneInput = screen.getByPlaceholderText("Mobile Number");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(phoneInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Mobile number is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(screen.getByText("Confirm password is required")).toBeInTheDocument();
    });
  });

  test("should submit the form with valid input", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText("Name   (Eg. John Doe)");
    const phoneInput = screen.getByPlaceholderText("Mobile Number");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Already have an account ? Login here")).toBeInTheDocument();
    });
  });
});
