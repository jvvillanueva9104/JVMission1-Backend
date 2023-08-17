export interface PremiumOutput {
  monthlyPrem: number;
  yearlyPrem: number;
}

export interface ErrorResponse {
  error: string;
}

export function calculatePremium(
  carValue: string,
  riskRating: number
): PremiumOutput | ErrorResponse {
  try {
    // Convert carValue to a numerical value without '$' and ',' characters
    const numericCarValue = parseFloat(carValue.replace(/[$,]/g, ""));

    // Check if riskRating is between 1 and 5

    if (riskRating < 1 || riskRating > 5) {
      throw new Error("Risk rating must be between 1 and 5");
    }

    // Calculate yearly premium
    const yearlyP = numericCarValue * (riskRating / 100);

    // Calculate monthly premium
    const monthlyP = yearlyP / 12;

    // Return the premium values as an object
    const premiumOutput: PremiumOutput = {
      monthlyPrem: parseFloat(monthlyP.toFixed(2)),
      yearlyPrem: parseFloat(yearlyP.toFixed(2)),
    };

    return premiumOutput;
  } catch (error: any) {
    return { error: error.message };
  }
}
