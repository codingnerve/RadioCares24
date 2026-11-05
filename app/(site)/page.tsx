import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, FaqAccordion } from "@/components/blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ChatSteps } from "@/components/home/ChatSteps";
import { DoDont } from "@/components/home/DoDont";
import { HeroArt } from "@/components/home/HeroArt";
import { QuickChecks } from "@/components/home/QuickChecks";
import { SymptomPicker } from "@/components/home/SymptomPicker";
import { Icon } from "@/components/Icon";
import { generalFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Friendly help for your car's satellite radio",
    description:
      "Friendly, independent help when your car's satellite radio won't activate, drops out, loses channels or sends a confusing renewal. Send an enquiry or call. Not affiliated with any radio provider.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Friendly help for your car's satellite radio` },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-8 sm:pb-32 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-butter/70 blur-2xl"
        />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="animate-rise">
            <p className="eyebrow">
              <Icon name="shield" className="h-4 w-4" /> Independent help, never your provider
            </p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl">
              Car radio stopped playing? <span className="text-coral-700">Let&apos;s sort it out together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Won&apos;t activate, keeps cutting out, channels gone or a renewal that makes no sense? Tell us what the
              radio is doing and we&apos;ll point you to the right next step in plain English.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquiry" className="btn btn-primary">
                Send an enquiry
              </a>
              {telHref ? (
                <a href={telHref} className="btn btn-ghost">
                  <Icon name="phone" className="h-5 w-5" /> Call {site.phoneDisplay}
                </a>
              ) : (
                <a href="#how-it-works" className="btn btn-ghost">
                  See how it works
                </a>
              )}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2.5 text-sm font-medium text-teal-900">
              {[
                "We never ask for card numbers or passwords",
                "We call you back on the number you give",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-soft">
                  <Icon name="check" className="h-4 w-4 text-sage-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <HeroArt className="mx-auto w-full max-w-md lg:max-w-none" />
          </div>
        </div>
      </section>

      <SymptomPicker />
      <QuickChecks />
      <ChatSteps />

      {/* Enquiry: split teal / white card */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className="px-3 py-16 sm:px-4 sm:py-24">
        <div className="container-page overflow-hidden !rounded-[2.5rem] bg-white !p-0 shadow-pop ring-1 ring-line lg:grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="on-teal bg-teal-800 p-7 sm:p-10">
            <p className="eyebrow">Quick request</p>
            <h2 id="enquiry-heading" className="mt-4 text-3xl !text-white sm:text-4xl">
              Tell us what&apos;s going on
            </h2>
            <p className="mt-4 text-teal-100">
              A few details are plenty to get started. The more exactly you can describe the message on the screen, the
              more useful our reply will be.
            </p>
            <ul className="mt-6 space-y-4 text-[0.9375rem] text-teal-100">
              <li className="flex gap-3">
                <Icon name="chat" className="mt-0.5 h-5 w-5 flex-none text-coral-100" />
                <span>Include your car, what the radio says and anything you&apos;ve already tried.</span>
              </li>
              <li className="flex gap-3">
                <Icon name="shield" className="mt-0.5 h-5 w-5 flex-none text-coral-100" />
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

      <DoDont />

      {/* FAQ: two columns of soft cards */}
      <section aria-labelledby="faq-heading" className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Quick answers</p>
              <h2 id="faq-heading" className="mt-3 text-3xl sm:text-[2.6rem]">
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
