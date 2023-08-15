import express, { Express, Request, Response } from "express";
import cors from "cors";
import calculate from "../Api1Test/calculate";
import {
  calculateRiskRating,
  Output,
  ErrorOutput,
} from "../Api2Test/calculate2"; // Update the path accordingly
import {
  calculatePremium,
  PremiumOutput,
  ErrorResponse,
} from "../Api3Test/quote";

const app: Express = express();
const port: number = 5001;

app.use(express.json());
app.use(cors());

app.post("/api/calculate", (req: Request, res: Response) => {
  try {
    const { model, year } = req.body;

    if (!model || !year) {
      return res
        .status(400)
        .json({ error: "Both model and year are required." });
    }

    const carValue = calculate(model, year);

    if (carValue === null) {
      return res
        .status(404)
        .json({ error: "Car value not found for the given model and year." });
    }

    res.json({ car_value: carValue });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.post("/api/calculateRiskRating", (req: Request, res: Response) => {
  try {
    const { claim_history } = req.body;

    if (!claim_history) {
      return res.status(400).json({ error: "Claim history is required." });
    }

    const riskRatingResult: Output | ErrorOutput =
      calculateRiskRating(claim_history);

    res.json(riskRatingResult);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.post("/api/calculatePremiumQuote", (req: Request, res: Response) => {
  try {
    const { car_value, risk_rating } = req.body;

    if (!car_value || !risk_rating) {
      return res
        .status(400)
        .json({ error: "Both car_value and risk_rating are required." });
    }

    const premiumResult: PremiumOutput | ErrorResponse = calculatePremium(
      car_value,
      risk_rating
    );

    res.json(premiumResult);
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorResponse = {
      error: "An internal server error occurred.",
    };
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

const server = app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});

export { app, server };
