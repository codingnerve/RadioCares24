import { Checklist, SectionHeading } from "@/components/blocks";
import { promises, weDo, weDont, type Accent } from "@/lib/content";

const promiseAccents: Accent[] = ["sage", "sky", "butter", "blush"];

export function DoDont() {
  return (
    <section aria-labelledby="scope-heading" className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="scope-heading"
          eyebrow="Straight talking"
          title="What we do, what we don't, and what we promise"
          lead="No ratings or big slogans. Just things you can check for yourself on this site."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="card !rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl">What we do</h3>
            <div className="mt-5">
              <Checklist items={weDo} />
            </div>
          </div>
          <div className="rounded-[2rem] bg-sand p-6 sm:p-8">
            <h3 className="text-2xl">What we don&apos;t do</h3>
            <div className="mt-5">
              <Checklist tone="limit" items={weDont} />
            </div>
          </div>
        </div>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <li key={p.title} className={`accent-${promiseAccents[i]} rounded-[2rem] p-6`}>
              <h3 className="text-lg !text-teal-950">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink/85">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
