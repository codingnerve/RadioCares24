import { SectionHeading } from "@/components/blocks";
import { quickChecks } from "@/lib/content";

export function QuickChecks() {
  return (
    <section aria-labelledby="checks-heading" className="py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="checks-heading"
          eyebrow="Before anything else"
          title="Three things worth trying first"
          lead="They take a few minutes, cost nothing, and fix more problems than you'd think."
        />
        <ol className="grid gap-4">
          {quickChecks.map((c, i) => (
            <li key={c.title} className="card flex items-start gap-4 !rounded-[1.5rem] p-5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-coral-500 font-display text-lg font-bold text-[#2a0f08]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl">{c.title}</h3>
                <p className="mt-1 text-muted">{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
