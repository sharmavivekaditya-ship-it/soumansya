import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore consultant-led psychiatry, counselling, psychometric testing, deaddiction, child mental health, and home-visit support at Soumanasya Clinic.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const grouped = Object.entries(
    services.reduce<Record<string, typeof services>>((accumulator, service) => {
      if (!accumulator[service.category]) {
        accumulator[service.category] = [];
      }

      accumulator[service.category].push(service);
      return accumulator;
    }, {}),
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <section className="space-y-5">
        <p className="eyebrow">Services</p>
        <h1 className="font-display text-6xl leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
          A full-spectrum mental health practice, presented with clarity and confidence.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Each treatment area is described as its own support pathway, so
          patients and families can understand where they fit before the first
          appointment.
        </p>
      </section>

      <section className="mt-10 space-y-10">
        {grouped.map(([category, categoryServices]) => (
          <div key={category} className="space-y-5">
            <div className="flex items-end justify-between gap-4 rounded-[1.8rem] border border-[var(--line)] bg-white/60 px-6 py-5">
              <div>
                <p className="eyebrow">Category</p>
                <h2 className="mt-2 font-display text-4xl leading-none text-[var(--foreground)]">
                  {category}
                </h2>
              </div>
              <p className="text-sm text-[var(--muted)]">
                {categoryServices.length} service
                {categoryServices.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {categoryServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
