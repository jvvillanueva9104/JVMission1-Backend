const calculate = (
  model: string,
  year: string | number
): { car_value: number } => {
  // Helper function to calculate the position of an alphabet letter
  const positionOfAlphabet = (letter: string): number => {
    return letter.toUpperCase().charCodeAt(0) - 64;
  };

  // Remove any non-alphabet characters from the model

  const cleanedModel: string = model.replace(/[^A-Za-z]/g, "").toUpperCase();
  const positionSum: number = [...cleanedModel].reduce(
    (sum: number, letter: string) => sum + positionOfAlphabet(letter),
    0
  );

  let numericCarModel: number = parseInt(
    model.replace(/[^0-9]/g, ""), // Remove non-numeric characters
    10
  );

  if (isNaN(numericCarModel)) {
    numericCarModel = 0;
  }

  const carValue: number =
    (positionSum + numericCarModel) * 100 + parseInt(year.toString(), 10);

  return { car_value: carValue };
};

export default calculate;
