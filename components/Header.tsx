"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { services } from "@/lib/content";
import { companyPages, site, telHref } from "@/lib/site";

const linkClass =
  "rounded-full px-4 py-2 font-display text-[0.9375rem] font-semibold text-teal-900 hover:bg-teal-50 aria-[current=page]:bg-teal-100";

/** Floating pill header: logo, guides menu, company links and the call button. */
export function Header() {
  const pathname = usePathname();
  // Menus remember the page they were opened on, so they close by themselves after navigation.
  const [mobileOpenOn, setMobileOpenOn] = useState<string | null>(null);
  const [guidesOpenOn, setGuidesOpenOn] = useState<string | null>(null);
  const mobileOpen = mobileOpenOn === pathname;
  const guidesOpen = guidesOpenOn === pathname;
  const setMobileOpen = (open: boolean) => setMobileOpenOn(open ? pathname : null);
  const setGuidesOpen = (open: boolean) => setGuidesOpenOn(open ? pathname : null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes menus; clicking outside closes the guides popover.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) toggleRef.current?.focus();
      setMobileOpenOn(null);
      setGuidesOpenOn(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) setGuidesOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [mobileOpen]);

  const current = (href: string) => (pathname === href ? "page" : undefined);
  const guidesActive = services.some((s) => s.href === pathname);

  return (
    <header className="sticky top-3 z-40 px-3 pt-3 sm:px-4">
      <div className="relative mx-auto max-w-[70rem]">
        <div className="flex h-16 items-center justify-between gap-3 rounded-full border border-line bg-white/90 pl-4 pr-2 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:pl-5">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div className="relative" ref={guidesRef}>
              <button
                type="button"
                className={`${linkClass} inline-flex items-center gap-1.5`}
                aria-expanded={guidesOpen}
                aria-controls="guides-menu"
                aria-current={guidesActive ? "page" : undefined}
                onClick={() => setGuidesOpen(!guidesOpen)}
              >
                Help guides
                <svg
                  viewBox="0 0 12 8"
                  className={`h-2 w-3 transition-transform ${guidesOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {guidesOpen && (
                <ul id="guides-menu" className="card absolute left-0 top-full mt-3 w-72 space-y-1 p-2 shadow-pop">
                  {services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        aria-current={current(s.href)}
                        className="flex items-center gap-3 rounded-2xl px-2 py-2 font-display font-semibold text-teal-900 hover:bg-cream aria-[current=page]:bg-cream"
                      >
                        <span className={`accent-${s.accent} flex h-9 w-9 flex-none items-center justify-center rounded-xl`}>
                          <Icon name={s.icon} className="h-5 w-5" />
                        </span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {companyPages.map((p) => (
              <Link key={p.href} href={p.href} aria-current={current(p.href)} className={linkClass}>
                {p.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {telHref ? (
              <a href={telHref} className="btn btn-primary !min-h-11 !px-3.5 min-[420px]:!px-5" aria-label={`Call us on ${site.phoneDisplay}`}>
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-900 hover:bg-teal-100 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="card absolute inset-x-0 top-full mt-3 max-h-[calc(100dvh-6.5rem)] overflow-y-auto p-3 shadow-pop lg:hidden"
          >
            <p className="eyebrow mb-2 ml-1">Help guides</p>
            <ul className="mb-3 grid gap-1">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={current(s.href)}
                    className="flex items-center gap-3 rounded-2xl px-2 py-2.5 font-display font-semibold text-teal-900 hover:bg-cream aria-[current=page]:bg-cream"
                  >
                    <span className={`accent-${s.accent} flex h-10 w-10 flex-none items-center justify-center rounded-xl`}>
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-2 ml-1">More</p>
            <ul className="grid gap-1">
              {companyPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} aria-current={current(p.href)} className={`${linkClass} block py-3`}>
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
