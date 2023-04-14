
import React from "react";
import { render, screen } from "@testing-library/react";
import SentimentAnalysis from "../Components/Sentiment/SentimentAnalysis";

describe("SentimentAnalysis component", () => {
  it("renders overall score correctly", () => {
    const sentimentScore = 8;
    render(<SentimentAnalysis sentimentScore={sentimentScore} />);
    const overallScore = screen.getByText(sentimentScore.toString());
    expect(overallScore).toBeInTheDocument();
  });

  it("renders sentiment type correctly for score >= 10", () => {
    const sentimentType =
      "Excellent: A rating of 5 out of 5, indicating an exceptional experience, outstanding food and service. Keep Going!!";
    render(<SentimentAnalysis sentimentType={sentimentType} />);
    const sentimentText = screen.getByText(sentimentType);
    expect(sentimentText).toBeInTheDocument();
  });

  it("renders sentiment type correctly for score >= 5 and < 10", () => {
    const sentimentType =
      "Good: a rating of 3 out of 5, indicating an average experience with decent food and service.";
    render(<SentimentAnalysis sentimentType={sentimentType} />);
    const sentimentText = screen.getByText(sentimentType);
    expect(sentimentText).toBeInTheDocument();
  });

  it("renders sentiment type correctly for score >= 3 and < 5", () => {
    const sentimentType = "Neutral";
    render(<SentimentAnalysis sentimentType={sentimentType} />);
    const sentimentText = screen.getByText(sentimentType);
    expect(sentimentText).toBeInTheDocument();
  });

  it("renders sentiment type correctly for score < 3", () => {
    const sentimentType =
      "Negative: a rating of 1 out of 5, indicating a very negative experience with significant issues in food or service.";
    render(<SentimentAnalysis sentimentType={sentimentType} />);
    const sentimentText = screen.getByText(sentimentType);
    expect(sentimentText).toBeInTheDocument();
  });
});
