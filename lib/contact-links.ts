import { contact, whatsapp } from "./content";
import type { Dictionary } from "./i18n";

/**
 * Contact links that arrive with the subject and the first lines already
 * written. Someone who has just read the site should not then face an empty
 * compose window — and a message that says where it came from is worth more
 * than one that does not.
 */

/** `mailto:` with subject and body, encoded per RFC 6068. */
export function mailtoLink(t: Dictionary): string {
  const params = new URLSearchParams({
    subject: t.contact.mailSubject,
    body: t.contact.mailBody,
  });
  // URLSearchParams encodes spaces as "+", which mail clients render literally
  // in a subject line rather than as spaces.
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}

/** wa.me link carrying the opening message. Empty when no number is configured. */
export function whatsappLink(t: Dictionary): string {
  if (!whatsapp) return "";
  return `${whatsapp}?text=${encodeURIComponent(t.contact.whatsappText)}`;
}
