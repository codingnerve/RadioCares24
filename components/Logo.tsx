import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Brand icon mark (microphone, headphones & care wave). */
export function LogoMark({ className = "h-9 w-9", light = false }: { className?: string; light?: boolean }) {
  return (
    <Image
      src={light ? "/logo-mark-light.png" : "/logo-mark.png"}
      alt=""
      width={48}
      height={48}
      className={`${className} object-contain`}
      aria-hidden="true"
    />
  );
}

/** Official RadioCares24 logo. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 ${className}`}
    >
      <Image
        src={light ? "/logo-light.png" : "/logo.png"}
        alt={site.name}
        width={172}
        height={52}
        priority
        className="h-8.5 w-auto sm:h-9 md:h-9.5 object-contain"
      />
    </Link>
  );
}
