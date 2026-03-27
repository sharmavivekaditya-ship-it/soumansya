"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { siteConfig } from "@/lib/site";

type QuickLeadWidgetProps = {
  services: Array<{ slug: string; title: string }>;
  locations: Array<{ slug: string; name: string }>;
};

export function QuickLeadWidget({
  services,
  locations,
}: QuickLeadWidgetProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shouldRenderWidget =
    pathname === "/about" ||
    pathname === "/team" ||
    pathname === "/services";

  const leadTitle = useMemo(() => {
    if (pathname.startsWith("/services/")) {
      return "Ask for a callback about this service";
    }

    if (pathname === "/contact") {
      return "Complete your enquiry";
    }

    return "Talk to the clinic today";
  }, [pathname]);

  if (!shouldRenderWidget) {
    return null;
  }

  return (
    <>
      <div className="lead-dock">
        <a href={`tel:${siteConfig.phoneRaw}`} className="btn-secondary">
          Call now
        </a>
        <a
          href={`https://wa.me/${siteConfig.phoneRaw.replace("+", "")}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          WhatsApp
        </a>
        <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
          Enquire
        </button>
      </div>

      <div className={`lead-sheet ${open ? "is-open" : ""}`}>
        <div
          className="lead-sheet__scrim"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
        <div className="lead-sheet__panel">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="eyebrow">Quick capture</p>
              <h2 className="font-display text-[2.35rem] leading-none text-[var(--foreground)] sm:text-4xl">
                {leadTitle}
              </h2>
              <p className="text-sm leading-6 text-[var(--muted)] sm:leading-7">
                This site-wide drawer captures enquiry intent without forcing a
                full page switch.
              </p>
            </div>
            <button
              type="button"
              className="btn-chip"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <LeadForm
            services={services}
            locations={locations}
            sourcePage={`${pathname}#quick-enquiry`}
            title="Request a callback"
            subtitle="Capture service interest, urgency, preferred channel, and location from anywhere on the site."
            ctaLabel="Request callback"
            compact
          />
        </div>
      </div>
    </>
  );
}
