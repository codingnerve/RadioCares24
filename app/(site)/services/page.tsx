import type { Metadata } from "next";
import Link from "next/link";
import { Checklist, ClosingCta, PageBanner } from "@/components/blocks";
import { Photo } from "@/components/Photo";
import { services, weDont } from "@/lib/content";
import type { PhotoSlot } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our services",
  description:
    "Independent guidance for in-car satellite radio: activation, signal and reception, missing channels and subscription questions. Not affiliated with any radio provider.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our services"
        photo="banner-services"
        title="Four areas where we can help"
        lead="Every guide explains what is usually going on, what you can check yourself and what to tell your provider or installer."
        crumbs={[{ name: "Services", path: "/services" }]}
      />

      <section className="py-14 sm:py-20" aria-label="Services">
        <div className="container-page space-y-14">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <Photo slot={`service-${s.category}` as PhotoSlot} className="w-full rounded-md" />
              </div>
              <div>
                <h2 className="text-3xl">{s.title}</h2>
                <p className="mt-3 text-lg text-muted">{s.short}</p>
                <div className="mt-5">
                  <Checklist items={s.helpWith.slice(0, 3)} />
                </div>
                <Link href={s.href} className="btn btn-primary mt-7">
                  Read the {s.title.toLowerCase()} guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper py-14" aria-labelledby="limits-heading">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Straight talking</p>
            <h2 id="limits-heading" className="mt-3 text-3xl">
              What we don&apos;t do
            </h2>
          </div>
          <Checklist tone="limit" items={weDont} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
