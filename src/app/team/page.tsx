import Image from "next/image";
import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data";
import { clinicMedia } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the psychiatrist and psychologists behind Soumanasya Clinic in Navi Mumbai.",
};

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <main className="page-shell mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-18">
      <section className="space-y-5">
        <p className="eyebrow">Clinical team</p>
        <h1 className="page-title">
          A consultant-led team with the calm presence and depth patients look for in serious care.
        </h1>
        <p className="body-lead max-w-3xl">
          Psychiatry, clinical psychology, counselling psychology, testing, and
          trauma-aware support come together here with one shared standard of care.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {team.map((member, index) => (
          <div
            key={member.slug}
            className={`section-card p-5 sm:p-8 ${
              index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-8" : ""
            }`}
          >
            <div className="image-frame team-portrait relative min-h-[240px] sm:min-h-[280px]">
              <Image
                src={clinicMedia.team[member.slug as keyof typeof clinicMedia.team]}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
            <div>
              <h2 className="mt-6 text-2xl font-semibold text-[var(--foreground)] lg:mt-0">
                {member.name}
              </h2>
              <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {member.bio}
              </p>
              <div className="soft-divider my-6" />
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Credentials
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                {member.credentials}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {member.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full border border-[var(--line)] bg-white/65 px-3 py-2 text-xs text-[var(--foreground)]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
