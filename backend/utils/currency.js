export function priceToNumber(priceStr) {
  // 1. Throw a TypeError if the input isn't even a string
  if (typeof priceStr !== 'string') {
    throw new TypeError(`priceToNumberStrict expected a string, but received ${typeof priceStr}`);
  }

  // 2. Clean up the string (remove commas, currency signs, and spaces)
  const cleaned = priceStr.replace(/,/g, '').replace('$', '').trim();

  // 3. Throw a SyntaxError if the string is completely empty after cleaning
  if (cleaned === '') {
    throw new SyntaxError("Price string cannot be empty");
  }

  const parsed = parseFloat(cleaned);

  // 4. Throw an error if parseFloat resulted in NaN
  if (Number.isNaN(parsed)) {
    throw new SyntaxError(`Failed to parse price. Invalid numeric string: "${priceStr}"`);
  }

  return parsed;
}
