import Link from "next/link";
import type { ParsedService } from "@/lib/data";

type ServiceCardProps = {
  service: ParsedService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-card group flex h-full flex-col gap-5 p-6 transition duration-300 hover:translate-y-[-6px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="eyebrow">{service.eyebrow}</p>
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            {service.title}
          </h3>
        </div>
        <span className="rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--foreground)]">
          {service.category}
        </span>
      </div>
      <p className="text-sm leading-7 text-[var(--muted)]">{service.summary}</p>
      <ul className="space-y-2 text-sm text-[var(--foreground)]">
        {service.focusAreas.slice(0, 3).map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="service-card__tail mt-auto flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          Explore service
        </span>
        <span className="text-2xl leading-none text-[var(--accent)] transition duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </Link>
  );
}
