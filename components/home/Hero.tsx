import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { site, telHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="on-navy relative isolate overflow-hidden bg-navy-900">
      <Photo slot="hero" alt="" preload sizing="parent" className="absolute inset-0 -z-10" sizes="100vw" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-900/80 lg:to-navy-900/35"
      />
      <div className="container-page py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl animate-rise">
          <p className="eyebrow">Independent help, never your provider</p>
          <h1 className="mt-5 text-4xl !text-white sm:text-5xl lg:text-[3.5rem]">
            Independent help for your car&apos;s satellite radio
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-100">
            Won&apos;t activate, keeps cutting out, channels gone or a renewal that makes no sense? Tell us what the
            radio is doing and we&apos;ll point you to the right next step in plain English.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#enquiry" className="btn btn-primary">
              Send an enquiry
            </a>
            {telHref ? (
              <a href={telHref} className="btn btn-ghost">
                <Icon name="phone" className="h-5 w-5" /> Call {site.phoneDisplay}
              </a>
            ) : (
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
