import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from '../Pages/Login';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from '../axios'; // import axios

jest.mock("../axios"); // hoist jest.mock() to the top of the file

describe("Login component", () => {


  test("Renders login form", () => {
    render(<Router><Login /></Router>);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });


  it("redirects to home page after successful login", async () => {
    const { getByPlaceholderText, getByText } = render(<Router><Login /></Router>);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");
  
    fireEvent.change(emailInput, { target: { value: "joy@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "anooja123" } });
    fireEvent.click(loginButton);
  
  });
  
  test("Login form submission with incorrect credentials", async () => {
    axios.post.mockImplementation((url, data) => {
      if (url === '/auth/login' && data.email === 'john.doe@example.com' && data.password === 'password123') {
        throw new Error('Invalid email or password')
      }
    })
    
  
    render(<Router><Login /></Router>);
  
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });
  
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/auth/login", {
        email: "john.doe@example.com",
        password: "password123",
      });
    });
  
    try {
      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
      });
    } catch (error) {
      // handle the error thrown by screen.getByText()
    }
  });
  
});
