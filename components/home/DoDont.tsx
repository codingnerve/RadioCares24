import { Checklist, SectionHeading } from "@/components/blocks";
import { Photo } from "@/components/Photo";
import { promises, weDo, weDont } from "@/lib/content";

export function DoDont() {
  return (
    <section aria-labelledby="scope-heading" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              id="scope-heading"
              eyebrow="Straight talking"
              title="What we do, and what we don't"
              lead="No ratings or big slogans. Just things you can check for yourself on this site."
            />
            <Photo slot="about" className="mt-8 hidden w-full rounded-md lg:block" />
          </div>
          <div className="grid gap-5">
            <div className="card p-6 sm:p-8">
              <h3 className="text-2xl">What we do</h3>
              <div className="mt-5">
                <Checklist items={weDo} />
              </div>
            </div>
            <div className="rounded-md bg-mist p-6 sm:p-8">
              <h3 className="text-2xl">What we don&apos;t do</h3>
              <div className="mt-5">
                <Checklist tone="limit" items={weDont} />
              </div>
            </div>
          </div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.title} className="border-t-2 border-orange-500 pt-4">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
