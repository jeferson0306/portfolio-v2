import { onlyDigits } from "./br";

/** Brands the Go service identifies, in the order it tests them. */
const BRANDS: { name: string; pattern: RegExp }[] = [
  { name: "Visa", pattern: /^4\d{12}(\d{3})?$/ },
  {
    name: "Mastercard",
    pattern: /^(5[1-5]\d{4}|222[1-9]\d{2}|22[3-9]\d{3}|2[3-6]\d{4}|27[01]\d{3}|2720\d{2})\d{10}$/,
  },
  { name: "American Express", pattern: /^3[47]\d{13}$/ },
  { name: "Elo", pattern: /^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6363)\d{10,12}$/ },
  { name: "Hipercard", pattern: /^(606282|3841)\d{10,12}$/ },
  { name: "Diners Club", pattern: /^3(0[0-5]|[68]\d)\d{11}$/ },
  { name: "Discover", pattern: /^6(011|5\d{2})\d{12}$/ },
];

/**
 * Luhn checksum: double every second digit from the right, subtract 9 from any
 * result above 9, and the total must be divisible by 10.
 */
export function passesLuhn(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length < 12 || digits.length > 19) return false;

  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits.charCodeAt(i) - 48;
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}

/** Returns the brand name, or null when no pattern matches. */
export function cardBrand(value: string): string | null {
  const digits = onlyDigits(value);
  return BRANDS.find((brand) => brand.pattern.test(digits))?.name ?? null;
}
