import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileCallBar } from "./MobileCallBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-teal-900 px-5 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
