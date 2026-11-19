import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { companyPages, infoPages, legalPages, primaryNav, servicePages } from "@/lib/site";

const root = join(__dirname, "..");

const hasRoute = (href: string) => href === "/" || existsSync(join(root, "app", "(site)", href.slice(1), "page.tsx"));

describe("navigation", () => {
  it("only links to routes that exist", () => {
    const hrefs = [...primaryNav, ...servicePages, ...companyPages, ...legalPages, ...infoPages].map((l) => l.href);
    const broken = hrefs.filter((h) => !hasRoute(h));
    expect(broken).toEqual([]);
  });

  it("puts the three information pages in the primary nav", () => {
    expect(infoPages.map((p) => p.href)).toEqual(["/services", "/how-it-works", "/resources"]);
    const nav = primaryNav.map((p) => p.href);
    for (const p of infoPages) expect(nav).toContain(p.href);
    expect(nav).toContain("/contact");
  });

  it("lists the information pages in the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    for (const p of infoPages) expect(urls.some((u) => u.endsWith(p.href)), p.href).toBe(true);
  });
});
