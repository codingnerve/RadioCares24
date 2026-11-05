import { Icon } from "./Icon";
import { site, telHref } from "@/lib/site";

/**
 * Floating call pill for small screens. Hidden by CSS while a form field has focus (see globals.css),
 * and the page reserves matching bottom padding, so it never covers inputs.
 */
export function MobileCallBar() {
  if (!telHref) return null;
  return (
    <div className="mobile-call-bar pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={telHref}
        className="btn btn-primary pointer-events-auto !min-h-14 w-full max-w-sm !text-lg shadow-pop"
        aria-label={`Call us on ${site.phoneDisplay}`}
      >
        <Icon name="phone" className="h-5 w-5" />
        Call {site.phoneDisplay}
      </a>
    </div>
  );
}
