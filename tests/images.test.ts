import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findPhoto, photoSlots, type PhotoSlot } from "@/lib/images";

const imagesDir = join(__dirname, "..", "public", "images");
const slots = Object.keys(photoSlots) as PhotoSlot[];
const tempFile = join(imagesDir, "hero.jpg");

afterEach(() => rmSync(tempFile, { force: true }));

describe("photo slots", () => {
  it("gives every slot alt text and a width/height ratio", () => {
    for (const slot of slots) {
      expect(photoSlots[slot].defaultAlt.trim().length, slot).toBeGreaterThan(0);
      expect(photoSlots[slot].ratio, slot).toMatch(/^\d+\/\d+$/);
    }
  });

  it("returns null when no file exists for a slot (fallback panel is used)", () => {
    for (const slot of slots) expect(findPhoto(slot), slot).toBeNull();
  });

  it("returns the public path once a file exists", () => {
    mkdirSync(imagesDir, { recursive: true });
    writeFileSync(tempFile, "x");
    expect(findPhoto("hero")).toBe("/images/hero.jpg");
  });

  it("documents every slot in public/images/README.md", () => {
    const readme = readFileSync(join(imagesDir, "README.md"), "utf8");
    for (const slot of slots) expect(readme, slot).toContain(slot);
  });
});
