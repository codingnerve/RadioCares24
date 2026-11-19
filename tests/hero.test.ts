import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const hero = readFileSync(join(__dirname, "..", "components", "home", "Hero.tsx"), "utf8");

describe("home hero", () => {
  it("treats the background photo as decorative (empty alt)", () => {
    expect(hero).toMatch(/<Photo[^>]*\balt=""/);
  });

  it("uses a solid overlay on small screens and the gradient only from lg up", () => {
    expect(hero).toMatch(/bg-navy-950\/(8|9)\d\b/);
    expect(hero).not.toMatch(/(^|[\s"])bg-gradient-to-r/);
    expect(hero).toMatch(/lg:bg-gradient-to-r/);
  });
});
