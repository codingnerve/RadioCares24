import type { Metadata, Viewport } from "next";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Friendly help for your car's satellite radio`,
    template: `%s | ${site.name}`,
  },
  description:
    "Friendly, independent help when your car's satellite radio won't activate, drops out, loses channels or sends a confusing renewal notice. Not affiliated with any radio provider.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
