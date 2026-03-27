import Image from "next/image";
import Link from "next/link";
import { clinicMedia, navigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(251,247,239,0.8)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
        <div className="header-shell">
          <div className="header-topline">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="image-frame flex h-11 w-11 items-center justify-center rounded-full !border-none !shadow-none">
                <Image
                  src={clinicMedia.logo}
                  alt="Soumanasya Clinic logo"
                  width={44}
                  height={44}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="header-brand-copy min-w-0">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Navi Mumbai Psychiatry
                </p>
                <p className="truncate font-display text-2xl leading-none text-[var(--foreground)]">
                  Soumanasya Clinic
                </p>
              </div>
            </Link>

            <div className="header-actions">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="btn-secondary hidden text-sm sm:inline-flex"
              >
                Call clinic
              </a>
              <Link href="/contact" className="btn-primary text-sm">
                Book now
              </Link>
            </div>
          </div>

          <nav className="header-nav text-sm text-[var(--muted)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-nav__item"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="header-nav__item sm:hidden"
            >
              Call
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
