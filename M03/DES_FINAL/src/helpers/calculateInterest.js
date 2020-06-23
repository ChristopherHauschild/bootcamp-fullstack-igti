function calculateInterest(initValue, interest, period) {
  let array = []
  
  let newValue = initValue
  let newValueWithInterest = newValue * (1 + interest / 100.0) - newValue;

  let newAccumulatedMonthly = (newValueWithInterest / newValue) * 100.0;

  let counter = 1

  for (let index = 1; index <= period; index++) {
    const valueWithInterest = (initValue * Math.pow(1 + interest / 100.0, index))

    newValueWithInterest = (valueWithInterest - initValue).toFixed(2)
    newAccumulatedMonthly = (newValueWithInterest / initValue)

    const value = {
      counter,
      valueWithInterest,
      newValueWithInterest,
      newAccumulatedMonthly: (newAccumulatedMonthly * 100).toFixed(2),
    };

    array.push(value);
    counter++;
  }

  return array
}

export { calculateInterest }