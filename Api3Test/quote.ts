export interface PremiumOutput {
  monthly_premium: number;
  yearly_premium: number;
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
    const numericCarValue = parseFloat(
      carValue.replace(/,/g, "").replace("$", "")
    );

    // Check if riskRating is between 1 and 5
    if (riskRating < 1 || riskRating > 5) {
      throw new Error("Risk rating must be between 1 and 5");
    }

    // Calculate yearly premium
    const yearlyPremium = numericCarValue * (riskRating / 100);

    // Calculate monthly premium
    const monthlyPremium = yearlyPremium / 12;

    // Return the premium values as an object
    const premiumOutput: PremiumOutput = {
      monthly_premium: parseFloat(monthlyPremium.toFixed(2)),
      yearly_premium: parseFloat(yearlyPremium.toFixed(2)),
    };

    return premiumOutput;
  } catch (error: any) {
    return { error: error.message };
  }
}
