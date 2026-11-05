import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { companyPages, legalPages, mailHref, servicePages, site, telHref } from "@/lib/site";

function Column({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 font-display text-base font-semibold !text-white">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-teal-100 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const hasAddress = site.addressLines.length > 0 || Boolean(site.legalName);
  return (
    <footer className="on-teal mt-8 rounded-t-[2.5rem] bg-teal-900 text-teal-100 sm:rounded-t-[3.5rem]">
      <div className="container-page grid gap-10 pb-10 pt-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            We&apos;re an independent help service for in-car satellite radio. We are not a satellite radio provider
            and we are not connected to, endorsed by or approved by any provider or car maker. We will never ask for
            card numbers or passwords.
          </p>
        </div>
        <Column title="Help guides" links={servicePages} />
        <Column title="About" links={companyPages} />
        <div>
          <h2 className="mb-3 font-display text-base font-semibold !text-white">Get in touch</h2>
          <ul className="space-y-3 text-sm">
            {telHref && (
              <li>
                <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-white hover:underline">
                  <Icon name="phone" className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </li>
            )}
            {mailHref && (
              <li>
                <a href={mailHref} className="inline-flex items-center gap-2 hover:text-white hover:underline">
                  <Icon name="mail" className="h-4 w-4" /> {site.email}
                </a>
              </li>
            )}
            {site.hours && (
              <li className="flex items-start gap-2">
                <Icon name="clock" className="mt-0.5 h-4 w-4 flex-none" /> {site.hours}
              </li>
            )}
            {hasAddress && (
              <li>
                <address className="flex items-start gap-2 not-italic">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 flex-none" />
                  <span>
                    {site.legalName && <strong className="block font-semibold text-white">{site.legalName}</strong>}
                    {site.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </li>
            )}
            <li>
              <Link href="/contact" className="btn btn-light !min-h-11">
                Send an enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div
          className={`container-page flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between ${telHref ? "pb-28 md:pb-6" : "pb-6"}`}
        >
          <p>
            © {site.year} {site.legalName || site.name}. All trademarks belong to their respective owners.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalPages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
