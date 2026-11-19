import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { companyPages, infoPages, legalPages, primaryNav, servicePages } from "@/lib/site";

const root = join(__dirname, "..");

/** Routes added later in the redesign; removed from this list when their pages exist. */
const pendingRoutes: string[] = ["/services", "/how-it-works", "/resources"];

const hasRoute = (href: string) => href === "/" || existsSync(join(root, "app", "(site)", href.slice(1), "page.tsx"));

describe("navigation", () => {
  it("only links to routes that exist", () => {
    const hrefs = [...primaryNav, ...servicePages, ...companyPages, ...legalPages, ...infoPages].map((l) => l.href);
    const broken = hrefs.filter((h) => !hasRoute(h) && !pendingRoutes.includes(h));
    expect(broken).toEqual([]);
  });

  it("puts the three information pages in the primary nav", () => {
    expect(infoPages.map((p) => p.href)).toEqual(["/services", "/how-it-works", "/resources"]);
    const nav = primaryNav.map((p) => p.href);
    for (const p of infoPages) expect(nav).toContain(p.href);
    expect(nav).toContain("/contact");
  });
});
