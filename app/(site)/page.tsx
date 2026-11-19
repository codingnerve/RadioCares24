import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, FaqAccordion } from "@/components/blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DoDont } from "@/components/home/DoDont";
import { Hero } from "@/components/home/Hero";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Resources } from "@/components/home/Resources";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Icon } from "@/components/Icon";
import { generalFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Independent help for your car's satellite radio",
    description:
      "Independent help when your car's satellite radio won't activate, drops out, loses channels or sends a confusing renewal. Send an enquiry or call. Not affiliated with any radio provider.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Independent help for your car's satellite radio` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceCards />
      <ProcessSteps />
      <DoDont />
      <Resources />

      {/* Enquiry: navy panel beside the form */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className="py-16 sm:py-20">
        <div className="container-page overflow-hidden rounded-md border border-line bg-white p-0 shadow-pop lg:grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="on-navy bg-navy-900 p-7 sm:p-10">
            <p className="eyebrow">Quick request</p>
            <h2 id="enquiry-heading" className="mt-4 text-3xl !text-white sm:text-4xl">
              Tell us what&apos;s going on
            </h2>
            <p className="mt-4 text-navy-100">
              A few details are plenty to get started. The more exactly you can describe the message on the screen, the
              more useful our reply will be.
            </p>
            <ul className="mt-6 space-y-4 text-[0.9375rem] text-navy-100">
              <li className="flex gap-3">
                <Icon name="chat" className="mt-0.5 h-5 w-5 flex-none text-orange-500" />
                <span>Include your car, what the radio says and anything you&apos;ve already tried.</span>
              </li>
              <li className="flex gap-3">
                <Icon name="shield" className="mt-0.5 h-5 w-5 flex-none text-orange-500" />
                <span>
                  We only use your details to answer you. Read the{" "}
                  <Link href="/privacy-policy" className="font-semibold text-white underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </div>
          <div className="p-6 sm:p-10">
            <EnquiryForm variant="compact" />
          </div>
        </div>
      </section>

      {/* FAQ: two columns */}
      <section aria-labelledby="faq-heading" className="pb-4">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Quick answers</p>
              <h2 id="faq-heading" className="mt-3 text-3xl sm:text-4xl">
                Questions people ask us most
              </h2>
            </div>
            <Link href="/faq" className="btn btn-ghost">
              See all questions
            </Link>
          </div>
          <div className="mt-8">
            <FaqAccordion faqs={generalFaqs.slice(0, 6)} columns={2} />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
