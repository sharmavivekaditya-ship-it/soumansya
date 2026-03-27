import Link from "next/link";
import { getLocations } from "@/lib/data";
import { navigation, siteConfig } from "@/lib/site";

export async function SiteFooter() {
  const locations = await getLocations();

  return (
    <footer className="border-t border-[var(--line)] bg-[color:rgba(255,255,255,0.65)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_1.1fr] lg:px-8">
        <div className="space-y-4">
          <p className="eyebrow">Mental health care</p>
          <h2 className="font-display text-4xl leading-none text-[var(--foreground)]">
            A calmer, more private experience of mental health care.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
            Soumanasya Clinic brings together psychiatry, counselling,
            psychometric testing, child and family support, and home-visit
            access across Vashi and Ulwe with one consistent clinical standard.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Navigate</p>
          <div className="flex flex-col gap-3 text-sm text-[var(--muted)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {locations.map((location) => (
            <div key={location.slug} className="section-card p-5">
              <p className="text-lg font-semibold text-[var(--foreground)]">
                {location.name}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {location.address}
              </p>
              <p className="mt-3 text-sm text-[var(--foreground)]">
                {location.hours}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
