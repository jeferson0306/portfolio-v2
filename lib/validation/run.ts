import {
  isValidCep,
  isValidCpf,
  isValidPhone,
  maskCep,
  maskCpf,
  maskPhone,
  onlyDigits,
} from "./br";
import { cleanName, isValidEmail, isValidFullName } from "./person";
import { cardBrand, passesLuhn } from "./card";

export type ValidationResult = {
  field: string;
  input: string;
  valid: boolean;
  /** The value stripped back to what a database should store. */
  normalized?: string;
  /** The value as a person expects to read it. */
  masked?: string;
  /** Anything the check learned beyond pass or fail. */
  detail?: string;
};

/**
 * Runs the same checks the Go service performs, in the browser.
 *
 * The rules themselves are the shared ones from dev-standards — see
 * `lib/validation/README.md`. Nothing here reimplements a validator; this only
 * shapes the result.
 */
export function runValidation(field: string, input: string): ValidationResult {
  const trimmed = input.trim();
  const base = { field, input: trimmed };

  switch (field) {
    case "cpf":
      return {
        ...base,
        valid: isValidCpf(trimmed),
        normalized: onlyDigits(trimmed),
        masked: maskCpf(trimmed),
        detail: "check digits verified",
      };

    case "email":
      return {
        ...base,
        valid: isValidEmail(trimmed),
        normalized: trimmed.toLowerCase(),
        detail: "format and case normalised",
      };

    case "name":
      return {
        ...base,
        valid: isValidFullName(trimmed),
        normalized: cleanName(trimmed).toUpperCase(),
        detail: "accents stripped, spaces collapsed",
      };

    case "phone":
      return {
        ...base,
        valid: isValidPhone(trimmed),
        normalized: onlyDigits(trimmed),
        masked: maskPhone(trimmed),
        detail: "area code and mobile rules",
      };

    case "cep":
      return {
        ...base,
        valid: isValidCep(trimmed),
        normalized: onlyDigits(trimmed),
        masked: maskCep(trimmed),
        detail: "length and known-invalid values",
      };

    case "card": {
      const brand = cardBrand(trimmed);
      return {
        ...base,
        valid: passesLuhn(trimmed),
        normalized: onlyDigits(trimmed),
        detail: brand ? `Luhn checksum · ${brand}` : "Luhn checksum · brand unknown",
      };
    }

    default:
      return { ...base, valid: false, detail: "unknown field" };
  }
}
