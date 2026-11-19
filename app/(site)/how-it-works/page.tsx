import type { Metadata } from "next";
import { ClosingCta, PageBanner } from "@/components/blocks";
import { Photo } from "@/components/Photo";
import { processSteps, promises } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How it works",
  description:
    "How RadioCares24 works: tell us what your car's satellite radio is doing, get plain guidance and checks, and learn exactly what to tell your provider or installer.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageBanner
        eyebrow="How it works"
        photo="banner-how-it-works"
        title="From confusing message to clear next step"
        lead="You stay in charge of your plan and your equipment. We help you understand the problem and what to do about it."
        crumbs={[{ name: "How it works", path: "/how-it-works" }]}
      />

      <section className="py-14 sm:py-20" aria-labelledby="steps-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 id="steps-heading" className="text-3xl sm:text-4xl">
              Four steps
            </h2>
            <ol className="mt-8 space-y-8">
              {processSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line pt-6">
                  <span className="font-display text-4xl font-semibold text-orange-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Photo slot="process" className="w-full rounded-md" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-16" aria-labelledby="promises-heading">
        <div className="container-page">
          <h2 id="promises-heading" className="text-3xl">
            What you can rely on
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title} className="card p-5">
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
