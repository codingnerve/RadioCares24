import Link from "next/link";
import { Icon } from "@/components/Icon";
import { symptoms } from "@/lib/content";

/** "What is your radio doing?" Four big tappable tiles. Plain links, so it works without JavaScript. */
export function SymptomPicker() {
  return (
    <section aria-labelledby="picker-heading" className="relative z-10 -mt-10 px-3 sm:-mt-14 sm:px-4">
      <div className="card container-page !rounded-[2.5rem] !px-5 py-7 sm:!px-9 sm:py-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="picker-heading" className="text-2xl sm:text-3xl">
            What is your radio doing?
          </h2>
          <p className="text-muted">Pick the closest match and we&apos;ll point you to the right guide.</p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {symptoms.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`accent-${s.accent} group relative flex h-full min-h-44 flex-col justify-between rounded-[2rem] p-5 transition-all hover:-translate-y-1 hover:shadow-pop`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                  <Icon name={s.icon} />
                </span>
                <span className="mt-6 block">
                  <span className="block font-display text-xl font-semibold leading-snug text-teal-950">{s.label}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink/80">{s.hint}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-teal-900 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
