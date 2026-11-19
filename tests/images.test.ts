import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findPhoto, photoSlots, type PhotoSlot } from "@/lib/images";

const slots = Object.keys(photoSlots) as PhotoSlot[];
const dirs: string[] = [];
const tempImagesDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "rc24-images-"));
  dirs.push(dir);
  return dir;
};

afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
});

describe("photo slots", () => {
  it("gives every slot alt text and a width/height ratio", () => {
    for (const slot of slots) {
      expect(photoSlots[slot].defaultAlt.trim().length, slot).toBeGreaterThan(0);
      expect(photoSlots[slot].ratio, slot).toMatch(/^\d+\/\d+$/);
    }
  });

  it("does not describe staff or people the site cannot vouch for in default alt text", () => {
    for (const slot of slots) {
      expect(photoSlots[slot].defaultAlt, slot).not.toMatch(/\b(team|advis[eo]rs?|staff|specialists?|experts?|agents?)\b/i);
    }
  });

  it("returns null when no file exists for a slot (fallback panel is used)", () => {
    const dir = tempImagesDir();
    for (const slot of slots) expect(findPhoto(slot, dir), slot).toBeNull();
  });

  it("returns the public path once a file exists, without touching public/images", () => {
    const dir = tempImagesDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "hero.webp"), "x");
    expect(findPhoto("hero", dir)).toBe("/images/hero.webp");
  });

  it("documents every slot in public/images/README.md", () => {
    const readme = readFileSync(join(__dirname, "..", "public", "images", "README.md"), "utf8");
    for (const slot of slots) expect(readme, slot).toContain(slot);
  });
});
