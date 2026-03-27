import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { getLocations, getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Appointments",
  description:
    "Request a private callback or book an appointment with Soumanasya Clinic in Vashi or Ulwe.",
};

export default async function ContactPage() {
  const [locations, services] = await Promise.all([getLocations(), getServices()]);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="eyebrow">Appointments</p>
          <h1 className="font-display text-6xl leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
            Private access to the clinic, without confusion or friction.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Call directly, send an email, message on WhatsApp, or request a
            callback through the enquiry form for the right branch and service.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="btn-primary"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-secondary"
            >
              {siteConfig.email}
            </a>
            <a
              href={`https://wa.me/${siteConfig.phoneRaw.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              WhatsApp
            </a>
          </div>
          <div className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(18,53,50,0.94),rgba(18,53,50,0.82))] p-6 text-[var(--background)] shadow-[0_22px_50px_rgba(18,53,50,0.16)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[rgba(247,241,231,0.7)]">
              What to expect
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-display">01</p>
                <p className="mt-2 text-sm text-[rgba(247,241,231,0.8)]">
                  Share the concern and preferred branch.
                </p>
              </div>
              <div>
                <p className="text-2xl font-display">02</p>
                <p className="mt-2 text-sm text-[rgba(247,241,231,0.8)]">
                  The clinic can route you to the most relevant service.
                </p>
              </div>
              <div>
                <p className="text-2xl font-display">03</p>
                <p className="mt-2 text-sm text-[rgba(247,241,231,0.8)]">
                  Follow-up happens on your preferred channel.
                </p>
              </div>
            </div>
          </div>
        </div>

        <LeadForm
          services={services.map((service) => ({
            slug: service.slug,
            title: service.title,
          }))}
          locations={locations.map((location) => ({
            slug: location.slug,
            name: location.name,
          }))}
          sourcePage="/contact"
          title="Request an appointment or callback"
          subtitle="Tell the clinic what support you need, how soon you want to be contacted, and the best way to reach you."
          ctaLabel="Send enquiry"
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {locations.map((location) => (
          <div key={location.slug} className="section-card p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Clinic location</p>
                <h2 className="mt-3 font-display text-4xl leading-none text-[var(--foreground)]">
                  {location.name}
                </h2>
              </div>
              <a
                href={location.mapLink}
                target="_blank"
                rel="noreferrer"
                className="btn-chip"
              >
                Directions
              </a>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              {location.address}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Hours
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                  {location.hours}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Nearby reach
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                  {location.neighbourhoods.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
