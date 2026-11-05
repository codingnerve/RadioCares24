import { describe, expect, it } from "vitest";
import * as content from "@/lib/content";
import { servicePages } from "@/lib/site";

const { services, symptoms, quickChecks, chatSteps, promises, weDo, weDont, generalFaqs } = content;

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

  it("has three quick checks and four alternating chat steps", () => {
    expect(quickChecks).toHaveLength(3);
    expect(chatSteps).toHaveLength(4);
    chatSteps.forEach((c, i) => expect(c.from).toBe(i % 2 === 0 ? "you" : "us"));
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
