"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { services } from "@/lib/content";
import { primaryNav, site, telHref } from "@/lib/site";

const linkClass =
  "px-3 py-2 text-[0.9375rem] font-semibold text-navy-900 hover:text-orange-700 aria-[current=page]:text-orange-700 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

/** Solid white header: logo, a Services menu for the four guides, the main pages and the call button. */
export function Header() {
  const pathname = usePathname();
  // Menus remember the page they were opened on, so they close by themselves after navigation.
  const [mobileOpenOn, setMobileOpenOn] = useState<string | null>(null);
  const [servicesOpenOn, setServicesOpenOn] = useState<string | null>(null);
  const mobileOpen = mobileOpenOn === pathname;
  const servicesOpen = servicesOpenOn === pathname;
  const setMobileOpen = (open: boolean) => setMobileOpenOn(open ? pathname : null);
  const setServicesOpen = (open: boolean) => setServicesOpenOn(open ? pathname : null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes menus; clicking outside closes the services popover.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) toggleRef.current?.focus();
      setMobileOpenOn(null);
      setServicesOpenOn(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [mobileOpen]);

  const current = (href: string) => (pathname === href ? "page" : undefined);
  const [servicesLink, ...otherLinks] = primaryNav;
  const servicesActive = pathname === servicesLink.href || services.some((s) => s.href === pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-page relative flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              className={`${linkClass} inline-flex items-center gap-1.5`}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              aria-current={servicesActive ? "page" : undefined}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              {servicesLink.label}
              <svg
                viewBox="0 0 12 8"
                className={`h-2 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {servicesOpen && (
              <ul id="services-menu" className="card absolute left-0 top-full mt-2 w-72 p-2 shadow-pop">
                <li>
                  <Link
                    href={servicesLink.href}
                    aria-current={current(servicesLink.href)}
                    className="block rounded px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-paper"
                  >
                    All services
                  </Link>
                </li>
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      aria-current={current(s.href)}
                      className="flex items-center gap-3 rounded px-3 py-2.5 font-semibold text-navy-900 hover:bg-paper aria-[current=page]:bg-paper"
                    >
                      <Icon name={s.icon} className="h-5 w-5 text-navy-700" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {otherLinks.map((p) => (
            <Link key={p.href} href={p.href} aria-current={current(p.href)} className={linkClass}>
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {telHref ? (
            <a
              href={telHref}
              className="btn btn-primary !min-h-11 !px-3.5 min-[420px]:!px-5"
              aria-label={`Call us on ${site.phoneDisplay}`}
            >
              <Icon name="phone" className="h-4 w-4" />
              <span className="hidden sm:inline">{site.phoneDisplay}</span>
              <span className="hidden min-[420px]:inline sm:hidden">Call</span>
            </a>
          ) : (
            <Link
              href="/contact"
              aria-label="Contact us"
              className="btn btn-primary !min-h-11 whitespace-nowrap !px-3.5 min-[420px]:!px-5"
            >
              <Icon name="chat" className="h-5 w-5 min-[420px]:hidden" />
              <span className="hidden min-[420px]:inline">Contact us</span>
            </Link>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-navy-900 hover:bg-paper lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white p-4 shadow-pop lg:hidden"
          >
            <p className="eyebrow mb-2">Our guides</p>
            <ul className="mb-4 grid gap-1">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={current(s.href)}
                    className="flex items-center gap-3 rounded px-2 py-2.5 font-semibold text-navy-900 hover:bg-paper aria-[current=page]:bg-paper"
                  >
                    <Icon name={s.icon} className="h-5 w-5 text-navy-700" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-2">Pages</p>
            <ul className="grid gap-1">
              {primaryNav.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={current(p.href)}
                    className="block rounded px-2 py-3 font-semibold text-navy-900 hover:bg-paper aria-[current=page]:bg-paper"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
