import type { Metadata } from "next";
import Link from "next/link";
import { Checklist, ClosingCta, PageBanner } from "@/components/blocks";
import { operatorLine } from "@/components/LegalPage";
import type { Accent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "RadioCares24 is an independent help service for in-car satellite radio. Learn who we are, how we work and where our help stops.",
  path: "/about",
});

const principles: { title: string; text: string; accent: Accent }[] = [
  {
    title: "Say what we are",
    text: "We're an independent service. We say so on every page and never pretend to be your provider.",
    accent: "sage",
  },
  {
    title: "Say what we can't do",
    text: "Every guide lists its limits. If something is outside what we can do, you hear it up front.",
    accent: "sky",
  },
  {
    title: "Ask for as little as possible",
    text: "We collect only what we need to reply, and never card numbers or account passwords.",
    accent: "butter",
  },
  {
    title: "Keep you in charge",
    text: "Your plan and your equipment are your decisions. We help you make them with the facts.",
    accent: "blush",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About us"
        title="A friendly, independent helping hand for car satellite radio"
        lead="There's a lot going on behind a satellite radio: the receiver, the antenna, the sky and your provider's account. We help drivers make sense of it."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl">Why RadioCares24 exists</h2>
            <div className="mt-5 space-y-4 text-lg text-muted">
              <p>
                When a car radio goes quiet, it&apos;s rarely clear who to ask. The receiver? The antenna? Your account? One
                message on the screen could mean any of them.
              </p>
              <p>
                We exist to take that first confusing step off your plate. Tell us what you see, and we&apos;ll help you
                work out the likely cause, what to check and what to say to your provider or installer, so you only
                explain it once.
              </p>
              <p>
                We are an independent help service. We don&apos;t run satellite networks, sell receivers or manage your
                account, and we are not connected to any provider or manufacturer.
              </p>
            </div>
          </div>
          <div className="card self-start !rounded-[2rem] p-6 sm:p-8">
            <h2 className="text-2xl">At a glance</h2>
            <dl className="mt-5 space-y-4 text-[0.9375rem]">
              <div>
                <dt className="font-display font-semibold text-teal-900">What we do</dt>
                <dd className="text-muted">Guidance on activation, signal, channels and plan questions.</dd>
              </div>
              <div>
                <dt className="font-display font-semibold text-teal-900">What we don&apos;t do</dt>
                <dd className="text-muted">Activate radios, change plans or repair hardware.</dd>
              </div>
              <div>
                <dt className="font-display font-semibold text-teal-900">How to reach us</dt>
                <dd className="text-muted">
                  The{" "}
                  <Link href="/contact" className="font-semibold text-coral-700 underline underline-offset-2">
                    enquiry form
                  </Link>
                  {site.phoneDisplay && <> or by phone on {site.phoneDisplay}</>}.
                </dd>
              </div>
              {(site.legalName || site.address) && (
                <div>
                  <dt className="font-display font-semibold text-teal-900">
                    {site.legalName ? "Operated by" : "Our address"}
                  </dt>
                  <dd className="text-muted">
                    {site.legalName ? operatorLine().replace(`${site.name}, operated by `, "") : site.address}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-4" aria-labelledby="principles-heading">
        <div className="container-page rounded-[2.5rem] bg-sand !px-6 py-14 sm:!px-12">
          <p className="eyebrow">How we work</p>
          <h2 id="principles-heading" className="mt-3 text-3xl sm:text-4xl">
            Four simple principles
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className={`accent-${p.accent} rounded-[2rem] p-6`}>
                <h3 className="text-xl !text-teal-950">{p.title}</h3>
                <p className="mt-2 text-ink/85">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="handling-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="handling-heading" className="text-3xl sm:text-4xl">
              What happens to your enquiry
            </h2>
            <p className="mt-4 text-lg text-muted">
              It goes straight to our team&apos;s inbox and is used only to reply to you. This website keeps no copy of
              it. The{" "}
              <Link href="/privacy-policy" className="font-semibold text-coral-700 underline underline-offset-2">
                privacy policy
              </Link>{" "}
              explains what we keep in our inbox, for how long and how to ask us to delete it.
            </p>
          </div>
          <Checklist
            items={[
              "Sent over an encrypted connection to a mailbox only our team can open",
              "Never sold, and never used for marketing",
              "No card details or passwords collected, ever",
              "Deleted on request or after our retention period",
            ]}
          />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
