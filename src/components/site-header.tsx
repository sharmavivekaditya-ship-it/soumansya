import Image from "next/image";
import Link from "next/link";
import { clinicMedia, navigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(251,247,239,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="image-frame flex h-11 w-11 items-center justify-center rounded-full !border-none !shadow-none">
            <Image
              src={clinicMedia.logo}
              alt="Soumanasya Clinic logo"
              width={44}
              height={44}
              className="h-9 w-9 object-contain"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              Navi Mumbai Psychiatry
            </p>
            <p className="font-display text-2xl leading-none text-[var(--foreground)]">
              Soumanasya Clinic
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="btn-secondary text-sm"
          >
            Call clinic
          </a>
          <Link href="/contact" className="btn-primary text-sm">
            Book appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
