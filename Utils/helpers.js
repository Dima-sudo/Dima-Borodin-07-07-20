// Maps the API image codes(int) and returns a String of the image type to render
export const getImageType = integer => {
  // Wanted to use my own assets, another approach would be to use the images on the API's website
  // Codes according to the API docs
  if (integer <= 5 || integer == 30) return 'Sunny';
  if (
    (integer > 5 && integer <= 11) ||
    integer == 20 ||
    integer == 32 ||
    integer == 35
  )
    return 'Cloudy';
  if (integer == 14 || integer == 17 || integer == 21) return 'SunnyRain';
  if (integer == 15 || integer == 16 || integer == 41 || integer == 42)
    return 'Storm';
  if ((integer > 11 && integer <= 19) || integer == 39 || integer == 40)
    return 'Rain';
  if (
    (integer > 21 && integer <= 29) ||
    integer == 31 ||
    integer == 43 ||
    integer == 44
  )
    return 'Snow';
  if (integer > 32 && integer <= 38) return 'Moon';

  return null;
};

// Converts F to C
export const fahrenheitToCelsius = integer => {
  return Math.floor((integer - 32) * (5 / 9));
};

// Converts C to F
export const celsiusToFahrenheit = integer => {
  return Math.floor((integer * 9) / 5 + 32);
};
