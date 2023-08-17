export interface Input {
  claim_history: string;
}

export interface Output {
  risk_rating?: number;
  error?: string;
}

export interface ErrorOutput {
  error: string;
}

export function calculateRiskRating(
  claim_history: string
): Output | ErrorOutput {
  const keywords = [
    "collide",
    "collided",
    "crash",
    "crashed",
    "scratch",
    "scratched",
    "bump",
    "bumped",
    "smash",
    "smashed",
  ];
  const lowerCaseClaimHistory = claim_history.toLowerCase();

  let riskRating = 0;
  for (const keyword of keywords) {
    const instances = (
      lowerCaseClaimHistory.match(new RegExp(`\\b${keyword}\\b`, "g")) || []
    ).length;
    riskRating += instances;
  }

  if (claim_history.trim() === "") {
    return { error: "No claim history provided" };
  }

  if (riskRating === 0) {
    return { risk_rating: 1 }; // Return a risk rating of 1 when calculated risk is 0
  }

  return { risk_rating: Math.min(riskRating, 5) };
}
