const cToF = (celsius: number) => {
  const cTemp = celsius;
  return (celsius * 9 / 5 + 32);
}

export const showTemperatureByUnit = (isCelsius: boolean, temperature: number) => {
  if(!isCelsius) {
      return `${Math.round(cToF(temperature))}°F`;
  }

  return `${temperature}°C`;
}