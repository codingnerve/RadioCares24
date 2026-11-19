import Link from "next/link";
import { SectionHeading } from "@/components/blocks";
import { quickChecks } from "@/lib/content";

export function Resources() {
  return (
    <section aria-labelledby="checks-heading" className="bg-paper py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            id="checks-heading"
            eyebrow="Resources"
            title="Three things worth trying first"
            lead="They take a few minutes, cost nothing, and fix more problems than you'd think."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/resources" className="btn btn-ghost">
              More resources
            </Link>
            <Link href="/faq" className="btn btn-ghost">
              Read the FAQ
            </Link>
          </div>
        </div>
        <ol className="grid gap-4">
          {quickChecks.map((c, i) => (
            <li key={c.title} className="card flex items-start gap-4 p-5">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded bg-navy-900 font-display text-lg font-semibold text-white">
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
