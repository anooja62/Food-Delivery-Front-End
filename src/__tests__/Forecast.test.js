import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "../Components/Restaurants/Sales/Forecast";

describe("Forecast component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should render a 'Calculate Forecast' button", () => {
    render(<Forecast />);
    const buttonElement = screen.getByText("Calculate Forecast");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should display a table of sales data", async () => {
    const mockSalesData = [
      { month: "January", totalAmount: 100 },
      { month: "February", totalAmount: 200 },
      { month: "March", totalAmount: 300 },
    ];
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ payments: mockSalesData }),
    });
    render(<Forecast />);
    const salesDataRows = await screen.findAllByRole("row", { name: /sales/i });
    expect(salesDataRows).toHaveLength(mockSalesData.length + 1);
  });

  it("should calculate and display a sales forecast when 'Calculate Forecast' button is clicked", async () => {
    const mockSalesData = [
      { month: "January", totalAmount: 100 },
      { month: "February", totalAmount: 200 },
      { month: "March", totalAmount: 300 },
    ];
    const mockForecastData = [
      { month: "Forecast 1", totalAmount: 400 },
      { month: "Forecast 2", totalAmount: 500 },
      { month: "Forecast 3", totalAmount: 600 },
    ];
    jest.spyOn(global, "fetch")
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ payments: mockSalesData }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ forecast: mockForecastData }),
      });
    render(<Forecast />);
    const calculateForecastButton = screen.getByText("Calculate Forecast");
    calculateForecastButton.click();
    const forecastRows = await screen.findAllByRole("row", { name: /forecast/i });
    expect(forecastRows).toHaveLength(mockForecastData.length);
  });

  it("should display an error message if there is not enough data to calculate a forecast", async () => {
    const mockSalesData = [{ month: "January", totalAmount: 100 }];
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ payments: mockSalesData }),
    });
    render(<Forecast />);
    const calculateForecastButton = screen.getByText("Calculate Forecast");
    calculateForecastButton.click();
    const errorMessage = await screen.findByText(/not enough data to calculate forecast/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
