/**
 * Central site configuration. Contact details come from environment variables so that
 * nothing is invented in code. Every value is optional: UI that depends on a missing value
 * is hidden rather than filled with a placeholder.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so rebuild after changing them.
 */

const clean = (value: string | undefined) => value?.trim() ?? "";

/** Keep only characters that are valid in a tel: URL. */
const toTelNumber = (value: string) => value.replace(/[^\d+]/g, "");

const phoneRaw =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE !== undefined
    ? clean(process.env.NEXT_PUBLIC_SUPPORT_PHONE)
    : "+18335957726";
const phone = toTelNumber(phoneRaw);

/**
 * Business postal address from NEXT_PUBLIC_BUSINESS_ADDRESS, e.g. "1 Main St, Springfield, IL 62701".
 * Split on the first comma into display lines. Empty when not configured.
 */
const addressRaw = clean(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);
const firstComma = addressRaw.indexOf(",");
const addressLines: string[] = !addressRaw
  ? []
  : firstComma === -1
    ? [addressRaw]
    : [addressRaw.slice(0, firstComma).trim(), addressRaw.slice(firstComma + 1).trim()];

export const site = {
  name: "RadioCares24",
  tagline: "Friendly help for your car's satellite radio",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) || "https://radiocares24.com").replace(/\/+$/, ""),
  /** E.164-style number used in tel: links. Empty when not configured. */
  phone,
  /** Human readable number; falls back to the raw configured value. */
  phoneDisplay:
    (process.env.NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY !== undefined
      ? clean(process.env.NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY)
      : "1-833-595-7726") || phoneRaw,
  email: clean(process.env.NEXT_PUBLIC_SUPPORT_EMAIL),
  hours: clean(process.env.NEXT_PUBLIC_SUPPORT_HOURS),
  legalName: clean(process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME),
  /** Address as separate display lines, and as a single comma-separated string. */
  addressLines,
  address: addressRaw,
  jurisdiction: clean(process.env.NEXT_PUBLIC_BUSINESS_JURISDICTION),
  year: clean(process.env.NEXT_PUBLIC_BUILD_YEAR) || "2026",
} as const;

export const telHref = site.phone ? `tel:${site.phone}` : "";
export const mailHref = site.email ? `mailto:${site.email}` : "";

/** Pages shown in navigation, footer and sitemap. */
export const servicePages = [
  { href: "/radio-activation", label: "Radio activation" },
  { href: "/signal-support", label: "Signal & reception" },
  { href: "/channel-assistance", label: "Missing channels" },
  { href: "/subscription-support", label: "Subscription enquiries" },
] as const;

export const companyPages = [
  { href: "/about", label: "About us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalPages = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;
