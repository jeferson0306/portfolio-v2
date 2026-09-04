/**
 * Person / common-field validation (framework-agnostic, zero deps).
 */

export function isValidEmail(value: string): boolean {
  const v = (value || "").trim();
  if (v.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/** Full name: at least two words, letters/accents only. */
export function isValidFullName(value: string): boolean {
  const n = (value || "").trim().replace(/\s+/g, " ");
  if (n.length < 3) return false;
  if (!/\s/.test(n)) return false; // needs at least 2 words
  return /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u.test(n);
}

export function cleanName(value: string): string {
  return (value || "")
    .replace(/[^\p{L}\s.'-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trimStart();
}

/* --------------------------- Birth date / age --------------------------- */

/** Accepts "YYYY-MM-DD" or "DD/MM/YYYY". Returns a Date at local midnight. */
export function parseBirthDate(value: string): Date | null {
  const v = (value || "").trim();
  let y: number, m: number, d: number;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (iso) {
    y = +iso[1];
    m = +iso[2];
    d = +iso[3];
  } else if (br) {
    d = +br[1];
    m = +br[2];
    y = +br[3];
  } else {
    return null;
  }
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, m - 1, d);
  // reject overflow (e.g. 31/02)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function ageFromDate(date: Date, now: Date = new Date()): number {
  let age = now.getFullYear() - date.getFullYear();
  const mo = now.getMonth() - date.getMonth();
  if (mo < 0 || (mo === 0 && now.getDate() < date.getDate())) age--;
  return age;
}

export function age(value: string, now: Date = new Date()): number | null {
  const d = parseBirthDate(value);
  return d ? ageFromDate(d, now) : null;
}

export function isValidBirthDate(value: string): boolean {
  const d = parseBirthDate(value);
  if (!d) return false;
  if (d.getTime() > Date.now()) return false;
  const a = ageFromDate(d);
  return a >= 0 && a <= 120;
}

/* ------------------------------- Country ------------------------------- */

// ISO 3166-1 alpha-2 country codes.
const ISO_ALPHA2 =
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW";

export const COUNTRY_CODES = new Set(ISO_ALPHA2.split(" "));

export function isValidCountryCode(value: string): boolean {
  return /^[A-Za-z]{2}$/.test(value || "") && COUNTRY_CODES.has(value.toUpperCase());
}
