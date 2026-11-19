import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Named photo slots. Drop a file called `<slot>.jpg` (or .jpeg, .webp, .png, .avif) into public/images/
 * and it appears in place. Slots without a file render a plain navy panel, so the site never breaks.
 * See public/images/README.md for sizes and guidance.
 */
export type PhotoSlot =
  | "hero"
  | "service-activation"
  | "service-signal"
  | "service-channels"
  | "service-subscription"
  | "about"
  | "process"
  | "contact"
  | "banner-services"
  | "banner-how-it-works"
  | "banner-resources";

/** `ratio` is the recommended source width/height; `defaultAlt` is used when a caller gives no alt. */
export const photoSlots: Record<PhotoSlot, { ratio: string; defaultAlt: string }> = {
  hero: { ratio: "16/9", defaultAlt: "A car dashboard with the radio display lit" },
  "service-activation": { ratio: "4/3", defaultAlt: "A car dashboard with the radio display on" },
  "service-signal": { ratio: "4/3", defaultAlt: "A car travelling on an open road" },
  "service-channels": { ratio: "4/3", defaultAlt: "A car radio screen showing a channel list" },
  "service-subscription": { ratio: "4/3", defaultAlt: "A person reviewing a radio subscription notice" },
  about: { ratio: "4/3", defaultAlt: "A support desk with a headset and notepad" },
  process: { ratio: "4/3", defaultAlt: "A headset and phone on a desk" },
  contact: { ratio: "16/9", defaultAlt: "A phone and headset ready for calls" },
  "banner-services": { ratio: "16/9", defaultAlt: "A car interior with the radio display lit" },
  "banner-how-it-works": { ratio: "16/9", defaultAlt: "A headset and notepad on a desk" },
  "banner-resources": { ratio: "16/9", defaultAlt: "A driver checking the radio display" },
};

const extensions = ["jpg", "jpeg", "webp", "png", "avif"] as const;

/**
 * Public path of the photo for a slot, or null when no file has been added yet.
 * `dir` is only overridden by tests, so they never touch the real public/images folder.
 */
export function findPhoto(slot: PhotoSlot, dir = join(/*turbopackIgnore: true*/ process.cwd(), "public", "images")): string | null {
  for (const ext of extensions) {
    if (existsSync(join(/*turbopackIgnore: true*/ dir, `${slot}.${ext}`))) return `/images/${slot}.${ext}`;
  }
  return null;
}
