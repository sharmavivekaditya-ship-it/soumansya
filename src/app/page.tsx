import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { ServiceCard } from "@/components/service-card";
import {
  getFeaturedServices,
  getLocations,
  getServices,
  getTeamMembers,
  getTestimonials,
} from "@/lib/data";
import { buildClinicJsonLd, buildFaqJsonLd } from "@/lib/json-ld";
import { clinicMedia, faqEntries, siteConfig } from "@/lib/site";

export default async function Home() {
  const [services, featuredServices, locations, team, testimonials] =
    await Promise.all([
      getServices(),
      getFeaturedServices(),
      getLocations(),
      getTeamMembers(),
      getTestimonials(),
    ]);

  const yearsActive = new Date().getFullYear() - siteConfig.foundedYear;
  const conditions = [
    "Depression and low mood",
    "Anxiety, panic, and stress overload",
    "Bipolar disorder and schizophrenia",
    "ADHD, autism, and developmental concerns",
    "Addiction and relapse support",
    "Trauma, sleep, and relationship difficulties",
  ];

  return (
    <main>
      <JsonLd data={buildClinicJsonLd({ locations, services, team })} />
      <JsonLd data={buildFaqJsonLd()} />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
        <div className="relative space-y-8">
          <div className="flex flex-wrap gap-3 reveal">
            <span className="hero-badge">Established {siteConfig.foundedYear}</span>
            <span className="hero-badge">Two Navi Mumbai clinics</span>
            <span className="hero-badge">Biopsychosocial care</span>
          </div>

          <div className="space-y-6 reveal delay-1">
            <p className="eyebrow">{siteConfig.primaryKeyword}</p>
            <h1 className="max-w-4xl font-display text-6xl leading-[0.92] tracking-[-0.03em] text-[var(--foreground)] sm:text-7xl">
              {siteConfig.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {siteConfig.heroCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 reveal delay-2">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Book an appointment
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore services
            </Link>
          </div>

          <div className="grid gap-4 text-sm text-[var(--foreground)] sm:grid-cols-3 reveal delay-3">
            <div className="section-card p-5">
              <p className="text-4xl font-display">{yearsActive}+</p>
              <p className="mt-2 leading-6 text-[var(--muted)]">
                years of clinic presence since 2014
              </p>
            </div>
            <div className="section-card p-5">
              <p className="text-4xl font-display">{services.length}</p>
              <p className="mt-2 leading-6 text-[var(--muted)]">
                service lines modelled in the database
              </p>
            </div>
            <div className="section-card p-5">
              <p className="text-4xl font-display">{locations.length}</p>
              <p className="mt-2 leading-6 text-[var(--muted)]">
                clinic locations across Vashi and Ulwe
              </p>
            </div>
          </div>
        </div>

        <div className="section-card relative overflow-hidden p-7 sm:p-8">
          <div className="hero-orb right-[-3rem] top-[-3rem] h-32 w-32 bg-[rgba(28,139,128,0.22)]" />
          <div className="hero-orb left-[15%] top-[28%] h-20 w-20 bg-[rgba(216,127,88,0.18)]" />
          <div className="hero-orb bottom-[-2rem] right-[20%] h-28 w-28 bg-[rgba(18,53,50,0.14)]" />
          <div className="relative space-y-6">
            <div className="image-frame relative aspect-[4/4.5] overflow-hidden">
              <Image
                src={clinicMedia.team["dr-chetan-vispute"]}
                alt="Dr. Chetan Vispute"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36vw"
                priority
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/30 bg-[rgba(18,53,50,0.78)] p-4 text-[var(--background)] backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.18em] text-[rgba(247,241,231,0.7)]">
                  Clinical lead
                </p>
                <p className="mt-1 text-xl font-semibold">Dr. Chetan Vispute</p>
                <p className="mt-1 text-sm text-[rgba(247,241,231,0.82)]">
                  MD, DNB, MNAMS, Psychiatry
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Local access</p>
              <h2 className="mt-3 font-display text-4xl leading-none text-[var(--foreground)]">
                Care that feels private, personal, and easy to return to.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Soumanasya is built for people who want careful psychiatry and
              counselling support without the rush, noise, or impersonality that
              often gets in the way of healing.
            </p>
            <div className="soft-divider" />
            <div className="grid gap-4">
              {locations.map((location) => (
                <div
                  key={location.slug}
                  className="rounded-[1.4rem] border border-[var(--line)] bg-white/70 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">
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
                      Directions
                    </a>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {location.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="section-card p-7 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="eyebrow">Why families choose Soumanasya</p>
              <h2 className="font-display text-5xl leading-none text-[var(--foreground)]">
                A serious clinic should feel steady, warm, and quietly authoritative.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-lg font-semibold">Consultant-led thinking</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Psychiatry and psychology are presented with clarity and
                  depth, so patients feel guided instead of overwhelmed.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-lg font-semibold">Depth across life stages</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Adult psychiatry, child mental health, family concerns, and
                  complex behavioural presentations sit under one practice.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-lg font-semibold">Clarity before treatment</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Testing, counselling, medication review, and follow-up are
                  framed as clear pathways, not vague promises.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
                <p className="text-lg font-semibold">Continuity that feels human</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Two branches and home-visit access help care stay consistent
                  even when a patient needs flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Signature care programs</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)]">
              Focused support for the concerns people trust a serious clinic to handle.
            </h2>
          </div>
          <Link href="/services" className="btn-secondary">
            View full service list
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 space-y-3">
          <p className="eyebrow">Inside the care philosophy</p>
          <h2 className="font-display text-5xl leading-none text-[var(--foreground)]">
            A practice that feels warm, contemporary, and clinically grounded at once.
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="image-frame relative min-h-[420px]">
            <Image
              src={clinicMedia.gallery[0].src}
              alt={clinicMedia.gallery[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/30 bg-[rgba(18,53,50,0.78)] p-5 text-[var(--background)] backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-[rgba(247,241,231,0.72)]">
                {clinicMedia.gallery[0].title}
              </p>
              <p className="mt-2 text-sm text-[rgba(247,241,231,0.84)]">
                {clinicMedia.gallery[0].copy}
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="image-frame relative min-h-[200px]">
              <Image
                src={clinicMedia.gallery[1].src}
                alt={clinicMedia.gallery[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {team.slice(1).map((member) => (
                <div key={member.slug} className="image-frame relative min-h-[220px]">
                  <Image
                    src={clinicMedia.team[member.slug as keyof typeof clinicMedia.team]}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-[1.2rem] border border-white/30 bg-[rgba(18,53,50,0.76)] p-3 text-[var(--background)] backdrop-blur-md">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs text-[rgba(247,241,231,0.76)]">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
        <div className="ink-panel p-7 sm:p-8">
          <p className="eyebrow">Conditions supported</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-[var(--background)]">
            The emotional and behavioural concerns patients most often want help for.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[rgba(247,241,231,0.76)]">
            From mood disorders and anxiety to child development, addiction,
            trauma, and relationship strain, the clinic offers more than a
            one-size-fits-all consultation.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--background)]">
            {conditions.map((condition) => (
              <li key={condition} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5">
          <div className="section-card p-7 sm:p-8">
            <p className="eyebrow">Care journey</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Clinical assessment",
                  copy: "A careful first consultation built around symptoms, history, and what daily life currently feels like.",
                },
                {
                  step: "02",
                  title: "Plan with depth",
                  copy: "Psychometric evaluation, counselling, medication review, or a blended route depending on the concern.",
                },
                {
                  step: "03",
                  title: "Steady follow-through",
                  copy: "Reviews, branch coordination, family guidance, and continuity designed to prevent fragmented care.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(245,236,227,0.6))] p-5 shadow-[0_18px_40px_rgba(18,53,50,0.08)]"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                    {item.step}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card p-7 sm:p-8">
            <p className="eyebrow">Clinicians and therapists</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.slug}
                  className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5"
                >
                  <div className="image-frame relative mb-4 min-h-[180px]">
                    <Image
                      src={clinicMedia.team[member.slug as keyof typeof clinicMedia.team]}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 20vw"
                    />
                  </div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{member.role}</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {member.specialties.slice(0, 2).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="eyebrow">Patient trust</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)]">
              People remember how calmly they were heard, not just what they were prescribed.
            </h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              The strongest mental health clinics feel reassuring before the
              first appointment. That reassurance begins with clarity, restraint,
              and human warmth.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.slug} className="note-panel p-6">
                <p className="text-base leading-8 text-[var(--foreground)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {testimonial.authorLabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          {faqEntries.map((item) => (
            <div key={item.question} className="section-card p-6">
              <p className="text-lg font-semibold text-[var(--foreground)]">
                {item.question}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="consultation-form"
        className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <LeadForm
          services={services.map((service) => ({
            slug: service.slug,
            title: service.title,
          }))}
          locations={locations.map((location) => ({
            slug: location.slug,
            name: location.name,
          }))}
          sourcePage="/"
          title="Request a private callback"
          subtitle="Share the concern, preferred branch, and urgency. The clinic can follow up on the right channel."
          ctaLabel="Request callback"
        />
      </section>
    </main>
  );
}
