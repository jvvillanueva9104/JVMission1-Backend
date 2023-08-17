import {
  calculatePremium,
  PremiumOutput,
  ErrorResponse,
} from "../Api3Test/quote"; // Update 'your-module' with the actual module path

describe("calculatePremium function", () => {
  // Test Case 1: Calculate Premium Successfully
  it("calculates premiums correctly for valid input", () => {
    const carValue = "$20000";
    const riskRating = 3;
    const output: PremiumOutput = {
      monthlyPrem: 50,
      yearlyPrem: 600,
    };
    expect(calculatePremium(carValue, riskRating)).toEqual(output);
  });

  // Test Case 2: Car Value with Comma
  it("handles car value with comma and calculates premiums", () => {
    const carValue = "$15,000";
    const riskRating = 4;
    const output: PremiumOutput = {
      monthlyPrem: 50,
      yearlyPrem: 600,
    };
    expect(calculatePremium(carValue, riskRating)).toEqual(output);
  });

  // Test Case 3: Invalid Risk Rating
  it("returns error for invalid risk rating", () => {
    const carValue = "$25000";
    const riskRating = 0; // Invalid risk rating
    const errorResponse: ErrorResponse = {
      error: "Risk rating must be between 1 and 5",
    };
    expect(calculatePremium(carValue, riskRating)).toEqual(errorResponse);
  });

  // Test Case 4: Invalid Car Value Format
  it("returns the same value even when there's no $ sign", () => {
    const carValue = "20000"; // Missing '$' character
    const riskRating = 2;
    const output: PremiumOutput = {
      monthlyPrem: 33.33, // Replace with the actual calculated values
      yearlyPrem: 400, // Replace with the actual calculated values
    };
    expect(calculatePremium(carValue, riskRating)).toEqual(output);
  });

  // Test Case 5: Negative Risk Rating
  it("returns error for negative risk rating", () => {
    const carValue = "$30000";
    const riskRating = -2; // Negative risk rating
    const errorResponse: ErrorResponse = {
      error: "Risk rating must be between 1 and 5",
    };
    expect(calculatePremium(carValue, riskRating)).toEqual(errorResponse);
  });
});
