import { calculateRiskRating, Input, Output } from "../Api2Test/calculate2"; // Update 'your-module' with the actual module path

describe("calculateRiskRating function", () => {
  // Test Case 1: No Keywords in Claim History
  it("returns the correct risk rating when there are no keywords in claim history", () => {
    const input: Input = {
      claim_history: "The driver has a clean record with no accidents.",
    };
    const output: Output = { risk_rating: 1 };
    expect(calculateRiskRating(input.claim_history)).toEqual(output);
  });

  // Test Case 2: Single Keyword Occurrence
  it("returns the correct risk rating when there is a single keyword occurrence", () => {
    const input: Input = {
      claim_history: "The driver collided with another car last year.",
    };
    const output: Output = { risk_rating: 1 };
    expect(calculateRiskRating(input.claim_history)).toEqual(output);
  });

  // Test Case 3: Multiple Keyword Occurrences
  it("returns the correct risk rating when there are multiple keyword occurrences", () => {
    const input: Input = {
      claim_history:
        "The driver crashed into a wall, bumped a pole, and scratched another car.",
    };
    const output: Output = { risk_rating: 3 };
    expect(calculateRiskRating(input.claim_history)).toEqual(output);
  });

  // Test Case 4: Mixed Case Keywords
  it("returns the correct risk rating when there are mixed case keywords", () => {
    const input: Input = {
      claim_history: "There was a Crash and a BUMP in the past.",
    };
    const output: Output = { risk_rating: 2 };
    expect(calculateRiskRating(input.claim_history)).toEqual(output);
  });

  // Test Case 5: No Claim History Provided
  it("returns the correct risk rating when no claim history is provided", () => {
    const input: Input = {
      claim_history: "",
    };
    const output: Output = { risk_rating: 1 };
    expect(calculateRiskRating(input.claim_history)).toEqual(output);
  });
});
