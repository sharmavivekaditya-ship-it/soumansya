import Image from "next/image";
import type { Metadata } from "next";
import { getLocations, getTeamMembers } from "@/lib/data";
import { clinicMedia, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Clinic",
  description:
    "Learn about Soumanasya Clinic, its consultant psychiatrist, psychologists, locations, and integrated care philosophy.",
};

export default async function AboutPage() {
  const [locations, team] = await Promise.all([getLocations(), getTeamMembers()]);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="eyebrow">About Soumanasya</p>
          <h1 className="font-display text-6xl leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
            A modern psychiatry and psychology practice shaped around trust, continuity, and clinical depth.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
            The clinic&apos;s published story positions Soumanasya as a
            neuropsychiatry-led centre founded in {siteConfig.foundedYear},
            designed to bring assessment, counselling, and psychiatric care into
            one consistent treatment experience.
          </p>
        </div>

        <div className="section-card p-7 sm:p-8">
          <div className="image-frame relative mb-6 aspect-[4/3] overflow-hidden">
            <Image
              src={clinicMedia.team["dr-chetan-vispute"]}
              alt="Dr. Chetan Vispute"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <p className="eyebrow">Clinical direction</p>
          <h2 className="mt-3 font-display text-4xl leading-none text-[var(--foreground)]">
            Dr. Chetan Vispute
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
            MD, DNB, MNAMS, Psychiatry
          </p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              The clinic states that Dr. Vispute trained at Seth GS Medical
              College and KEM Hospital, completed his MD in Psychiatry, and also
              holds a DNB in Psychiatry.
            </p>
            <p>
              The same profile notes his work as a consultant neuropsychiatrist
              at the Institute of Psychological Health in Thane and as an
              assistant professor at Dr. D. Y. Patil Medical College, Navi
              Mumbai.
            </p>
            <p>
              His service focus on the clinic site includes adult psychiatry,
              child and adolescent mental health, addiction care, and
              second-opinion consultations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Biopsychosocial model",
            copy: "Care is framed around biological, psychological, and social realities, rather than reducing a person to a diagnosis.",
          },
          {
            title: "Multi-disciplinary support",
            copy: "Psychiatry, counselling, psychometric testing, and guided therapeutic work are designed to support each other.",
          },
          {
            title: "Local access",
            copy: "Vashi, Ulwe, and home-visit access help the practice stay both premium and practical for families across Navi Mumbai.",
          },
        ].map((item) => (
          <div key={item.title} className="section-card p-6">
            <p className="text-xl font-semibold text-[var(--foreground)]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {item.copy}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="section-card p-7 sm:p-8">
          <p className="eyebrow">Clinical voices</p>
          <div className="mt-5 space-y-5">
            {team.map((member) => (
              <div
                key={member.slug}
                className="rounded-[1.7rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,240,232,0.72))] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-[var(--foreground)]">
                      {member.name}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{member.role}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {member.credentials}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card p-7 sm:p-8">
          <p className="eyebrow">Clinic presence</p>
          <div className="mt-5 grid gap-5">
            {locations.map((location) => (
              <div
                key={location.slug}
                className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5"
              >
                <p className="text-xl font-semibold text-[var(--foreground)]">
                  {location.name}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {location.address}
                </p>
                <p className="mt-3 text-sm text-[var(--foreground)]">
                  {location.hours}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Areas served: {location.neighbourhoods.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
