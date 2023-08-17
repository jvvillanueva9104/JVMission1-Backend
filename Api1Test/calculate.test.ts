import calculate from "./calculate";

describe("calculate the model and year based on user's input", () => {
  it("Calculates car value correctly for valid input", () => {
    const input: { model: string; year: number } = {
      model: "Civic",
      year: 2014,
    };
    const output = calculate(input.model, input.year);
    expect(output).toEqual({ car_value: 6614 });
  });

  it("Handles different model and year", () => {
    const input: { model: string; year: number } = {
      model: "Accord",
      year: 2020,
    };
    const output = calculate(input.model, input.year);
    expect(output).toEqual({ car_value: 6420 });
  });

  it("Handles model with spaces", () => {
    const input: { model: string; year: number } = {
      model: "Ford Mustang",
      year: 2015,
    };
    const output = calculate(input.model, input.year);
    expect(output).toEqual({ car_value: 15815 });
  });

  it("Handles uppercase and lowercase model", () => {
    const input: { model: string; year: number } = {
      model: "TesTCase",
      year: 2022,
    };
    const output = calculate(input.model, input.year);
    expect(output).toEqual({ car_value: 11222 });
  });

  it("Handles special characters in model", () => {
    const input: { model: string; year: number } = {
      model: "!@#$123Camry456%^&",
      year: 2018,
    };
    const output = calculate(input.model, input.year);
    expect(output).toEqual({ car_value: 8018 });
  });
});
