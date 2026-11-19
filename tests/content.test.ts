import { describe, expect, it } from "vitest";
import * as content from "@/lib/content";
import { servicePages } from "@/lib/site";

const { services, symptoms, quickChecks, processSteps, promises, weDo, weDont, generalFaqs } = content;

describe("content", () => {
  it("has four services with unique slugs, hrefs and accents", () => {
    expect(services).toHaveLength(4);
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
    expect(new Set(services.map((s) => s.accent)).size).toBe(4);
    for (const s of services) expect(s.href).toBe("/" + s.slug);
  });

  it("symptom picker covers every service page exactly once", () => {
    const hrefs = servicePages.map((p) => p.href).sort();
    expect(symptoms.map((s) => s.href).sort()).toEqual(hrefs);
    expect(symptoms).toHaveLength(4);
  });

  it("has three quick checks and four process steps without timing promises", () => {
    expect(quickChecks).toHaveLength(3);
    expect(processSteps).toHaveLength(4);
    for (const step of processSteps) {
      expect(step.title.trim().length).toBeGreaterThan(0);
      expect(`${step.title} ${step.text}`).not.toMatch(/within|minutes?|hours?|24|guarantee/i);
    }
    expect(promises).toHaveLength(4);
    expect(weDo.length).toBeGreaterThanOrEqual(3);
    expect(weDont.length).toBeGreaterThanOrEqual(3);
    expect(generalFaqs).toHaveLength(10);
  });

  it("makes no hours, rating or guarantee claims and never names the sister brand", () => {
    const text = JSON.stringify(content)
      .replace(/(can't|cannot|don't|do not|won't|never) (promise or )?guarantee/gi, "");
    expect(text).not.toMatch(/24\/7|24 hours|around the clock|guarantee|official|authori[sz]ed (dealer|partner)|radiosatscare|\b5 stars?\b|testimonial/i);
  });
});
