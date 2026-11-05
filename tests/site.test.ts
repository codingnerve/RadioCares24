import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSite() {
  vi.resetModules();
  return import("@/lib/site");
}

const CONTACT_VARS = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPPORT_PHONE",
  "NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY",
  "NEXT_PUBLIC_SUPPORT_EMAIL",
  "NEXT_PUBLIC_SUPPORT_HOURS",
  "NEXT_PUBLIC_BUSINESS_LEGAL_NAME",
  "NEXT_PUBLIC_BUSINESS_ADDRESS",
  "NEXT_PUBLIC_BUSINESS_JURISDICTION",
];

describe("site config", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("falls back to RadioCares24 defaults with every contact variable blank", async () => {
    for (const v of CONTACT_VARS) vi.stubEnv(v, "");
    const { site, telHref, mailHref } = await loadSite();
    expect(site.name).toBe("RadioCares24");
    expect(site.url).toBe("https://radiocares24.com");
    expect(site.address).toBe("");
    expect(site.addressLines).toEqual([]);
    expect(telHref).toBe("");
    expect(mailHref).toBe("");
    expect(site.hours).toBe("");
  });

  it("splits the business address on the first comma only", async () => {
    for (const v of CONTACT_VARS) vi.stubEnv(v, "");
    vi.stubEnv("NEXT_PUBLIC_BUSINESS_ADDRESS", "1 Test St, Springfield, IL 62701");
    const { site } = await loadSite();
    expect(site.addressLines).toEqual(["1 Test St", "Springfield, IL 62701"]);
    expect(site.address).toBe("1 Test St, Springfield, IL 62701");
  });
});
