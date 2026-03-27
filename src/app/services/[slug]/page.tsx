import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { ServiceCard } from "@/components/service-card";
import { getLocations, getServiceBySlug, getServices } from "@/lib/data";
import { buildServiceJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, services, locations] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getLocations(),
  ]);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <JsonLd data={buildServiceJsonLd(service)} />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.86fr]">
        <div className="space-y-5">
          <p className="eyebrow">{service.category}</p>
          <h1 className="font-display text-6xl leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
            {service.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {service.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="btn-primary"
            >
              Call clinic
            </a>
            <Link href="#service-enquiry" className="btn-secondary">
              Enquire about this service
            </Link>
          </div>
        </div>

        <div className="section-card p-7 sm:p-8">
          <p className="eyebrow">Why patients seek this care</p>
          <div className="mt-5 grid gap-4">
            {[
              "A clearer understanding of what the concern may be",
              "A treatment path tailored to severity and daily functioning",
              "Thoughtful follow-up rather than one-off advice",
              "Privacy, dignity, and family-aware planning where needed",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5 text-sm text-[var(--foreground)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="section-card p-7 sm:p-8">
          <p className="eyebrow">Overview</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            {service.description.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="section-card p-7 sm:p-8">
            <p className="eyebrow">Common focus areas</p>
            <ul className="mt-5 grid gap-3 text-sm text-[var(--foreground)] sm:grid-cols-2">
              {service.focusAreas.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.2rem] border border-[var(--line)] bg-white/65 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="section-card p-7 sm:p-8">
            <p className="eyebrow">Care may include</p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
              {service.careIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="section-card p-7 sm:p-8">
          <p className="eyebrow">Best fit</p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
            {service.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="soft-divider my-6" />
          <div className="space-y-4">
            <p className="text-lg font-semibold text-[var(--foreground)]">
              Available across current clinic locations
            </p>
            {locations.map((location) => (
              <div
                key={location.slug}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      {location.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {location.hours}
                    </p>
                  </div>
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-chip"
                  >
                    Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="service-enquiry">
          <LeadForm
            services={services.map((item) => ({
              slug: item.slug,
              title: item.title,
            }))}
            locations={locations.map((location) => ({
              slug: location.slug,
              name: location.name,
            }))}
            sourcePage={`/services/${service.slug}`}
            lockedService={service.title}
            title={`Enquire about ${service.title}`}
            subtitle="Share the concern, your preferred location, and how soon you would like to be contacted."
            ctaLabel="Request service callback"
          />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Related services</p>
            <h2 className="mt-2 font-display text-4xl leading-none text-[var(--foreground)]">
              Explore nearby support pathways.
            </h2>
          </div>
          <Link href="/services" className="btn-secondary">
            Browse all services
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {relatedServices.map((item) => (
            <ServiceCard key={item.slug} service={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
