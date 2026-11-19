import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "..", "app", "globals.css"), "utf8");

function token(name: string): string {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found in globals.css`);
  return m[1];
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = "#ffffff";

describe("design tokens", () => {
  const pairs: [string, string, string, number][] = [
    ["body text on white", token("ink"), WHITE, 7],
    ["muted text on white", token("muted"), WHITE, 4.5],
    ["muted text on paper", token("muted"), token("paper"), 4.5],
    ["button text (navy-950) on orange-500", token("navy-950"), token("orange-500"), 4.5],
    ["orange-700 text on white", token("orange-700"), WHITE, 4.5],
    ["white text on navy-900", WHITE, token("navy-900"), 7],
    ["orange-500 on navy-900 (footer accents)", token("orange-500"), token("navy-900"), 4.5],
    ["navy-100 on navy-900 (footer links)", token("navy-100"), token("navy-900"), 4.5],
  ];

  for (const [label, fg, bg, min] of pairs) {
    it(`meets ${min}:1 for ${label}`, () => {
      expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
    });
  }

  it("keeps the reduced-motion rule", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("uses the serif display face for headings", () => {
    expect(css).toMatch(/--font-display:[^;]*Source Serif 4/);
  });
});
