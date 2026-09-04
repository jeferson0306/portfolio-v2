import { onlyDigits } from "./br";

/**
 * RG is issued per state with no national checksum, so there is nothing to
 * verify beyond shape — which is exactly what the Go service claims to do
 * ("Validates basic Brazilian RG format"). dev-standards has no RG validator
 * because there is no rule worth sharing.
 */
/** RG may legitimately end in X as a check character; nothing else is allowed. */
const RG_CHARS = /^[\d.\-\s]*[xX]?$/;

export function isValidRg(value: string): boolean {
  if (!RG_CHARS.test(value ?? "")) return false;
  const digits = onlyDigits(value.replace(/[xX]$/, "0"));
  return digits.length >= 7 && digits.length <= 10 && !/^(\d)\1+$/.test(digits);
}
