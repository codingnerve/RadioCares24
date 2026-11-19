import { SectionHeading } from "@/components/blocks";
import { processSteps } from "@/lib/content";

export function ProcessSteps() {
  return (
    <section id="how-it-works" aria-labelledby="process-heading" className="bg-paper py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="Four steps, no jargon"
          lead="You stay in charge of your plan and your equipment. We help you understand the problem and what to do next."
        />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-navy-900 pt-5">
              <span className="font-display text-4xl font-semibold text-orange-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
