import request from "supertest";
import { app, server } from "./index"; // Update the path accordingly

describe("API Endpoints", () => {
  it("should calculate car value successfully", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ model: "Toyota Camry", year: 2020 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
  });

  it("should handle missing fields in /api/calculate", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ model: "Honda Civic" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Both model and year are required.",
    });
  });

  it("should handle car value not found in /api/calculate", async () => {
    const response = await request(app)
      .post("/api/calculate")
      .send({ model: "Ford Mustang", year: 2015 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
  });

  it("should calculate risk rating successfully", async () => {
    const response = await request(app)
      .post("/api/calculateRiskRating")
      .send({ claim_history: "some_claim_history" }); // Provide valid claim history

    expect(response.status).toBe(200);
    // Adjust the expectation based on the actual response structure
    expect(response.body).toHaveProperty("risk_rating");
  });

  it("should handle missing field in /api/calculateRiskRating", async () => {
    const response = await request(app)
      .post("/api/calculateRiskRating")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Claim history is required.",
    });
  });
  afterAll((done) => {
    server.close(done);
  });
});
