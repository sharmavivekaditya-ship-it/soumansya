import type { Metadata } from "next";
import { QuickLeadWidget } from "@/components/quick-lead-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocations, getServices } from "@/lib/data";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Psychiatrist in Navi Mumbai`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Consultant-led psychiatry, psychology, child mental health, psychometric testing, and home-visit support from Soumanasya Clinic in Navi Mumbai.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Psychiatrist in Navi Mumbai`,
    description:
      "Adult psychiatry, child mental health, psychometric testing, group therapy, home visits, and counselling in Navi Mumbai.",
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Psychiatrist in Navi Mumbai`,
    description:
      "Evidence-based psychiatry and counselling across Vashi and Ulwe.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [services, locations] = await Promise.all([getServices(), getLocations()]);

  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full font-sans text-[var(--foreground)] antialiased">
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <SiteFooter />
          <QuickLeadWidget
            services={services.map((service) => ({
              slug: service.slug,
              title: service.title,
            }))}
            locations={locations.map((location) => ({
              slug: location.slug,
              name: location.name,
            }))}
          />
        </div>
      </body>
    </html>
  );
}
