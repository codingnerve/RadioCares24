import Link from "next/link";
import { SectionHeading } from "@/components/blocks";
import { Photo } from "@/components/Photo";
import { services } from "@/lib/content";
import type { PhotoSlot } from "@/lib/images";

export function ServiceCards() {
  return (
    <section aria-labelledby="services-heading" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Our services"
            title="What is your radio doing?"
            lead="Pick the closest match and we'll show you what usually causes it and what to try."
          />
          <Link href="/services" className="btn btn-ghost">
            View all services
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug} className="card relative flex flex-col overflow-hidden">
              <Photo
                slot={`service-${s.category}` as PhotoSlot}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{s.short}</p>
                <Link
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-1 font-semibold text-orange-700 after:absolute after:inset-0 hover:underline"
                >
                  Read the guide <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
