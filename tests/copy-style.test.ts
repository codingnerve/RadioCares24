import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");

function walk(path: string, out: string[] = []) {
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) walk(join(path, name), out);
  } else if (/\.tsx$/.test(path)) out.push(path);
  return out;
}

function walkAll(path: string, out: string[] = []) {
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) walkAll(join(path, name), out);
  } else if (/.(tsx?|css|svg)$/.test(path)) out.push(path);
  return out;
}

const sources = ["app", "components"].flatMap((t) => walk(join(root, t)));

describe("page copy and contact fallbacks", () => {
  it("makes no hours, testimonial or customer-count claims in page markup", () => {
    const claim = /24\/7|around the clock|testimonial|★|\d[\d,]*\+? (customers|drivers|cars)\b/i;
    const offenders = sources.filter((f) => claim.test(readFileSync(f, "utf8"))).map((f) => relative(root, f));
    expect(offenders).toEqual([]);
  });

  it("never renders a tel: link without checking a phone number is configured", () => {
    const offenders: string[] = [];
    for (const f of sources) {
      const lines = readFileSync(f, "utf8").split(/\r?\n/);
      lines.forEach((line, i) => {
        if (!line.includes("href={telHref}")) return;
        const window = lines.slice(Math.max(0, i - 12), i + 1).join("\n");
        if (!/telHref\s*(\?|&&)|if \(!telHref\)/.test(window)) offenders.push(`${relative(root, f)}:${i + 1}`);
      });
    }
    expect(offenders).toEqual([]);
  });

  it("has no leftover colours or wording from the old playful look", () => {
    const files = [
      ...["app", "components", "lib"].flatMap((t) => walkAll(join(root, t))),
    ];
    const legacy = /#fbf6ec|#0e5a57|#083f3d|#ff6a4d|#ffd9cf|friendly help/i;
    const offenders = files.filter((f) => legacy.test(readFileSync(f, "utf8"))).map((f) => relative(root, f));
    expect(offenders).toEqual([]);
  });

  it("has no leftover playful styling classes or removed components", () => {
    const patterns: [string, RegExp][] = [
      ["old teal/coral/cream/sand tokens", /\b(teal|coral)-\d|\b(bg|text|border)-(cream|sand)\b|on-teal/],
      ["large rounded corners", /rounded-\[[1-9]\d*(\.\d+)?rem\]/],
      ["pill buttons", /className="[^"]*\bbtn\b[^"]*\brounded-full\b|className="[^"]*\brounded-full\b[^"]*\bbtn\b/],
      ["decorative blur blobs", /blur-2xl|blur-3xl/],
      ["removed components", /HeroArt|ChatSteps|SymptomPicker/],
    ];
    const offenders: string[] = [];
    for (const f of sources) {
      const text = readFileSync(f, "utf8");
      for (const [label, re] of patterns) if (re.test(text)) offenders.push(`${relative(root, f)}: ${label}`);
    }
    expect(offenders).toEqual([]);
  });
});
