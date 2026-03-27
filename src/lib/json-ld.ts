import type { ParsedLocation, ParsedService, ParsedTeamMember } from "@/lib/data";
import { faqEntries, siteConfig } from "@/lib/site";

export function buildClinicJsonLd({
  locations,
  services,
  team,
}: {
  locations: ParsedLocation[];
  services: ParsedService[];
  team: ParsedTeamMember[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.legalName,
    url: siteConfig.domain,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    medicalSpecialty: "Psychiatry",
    areaServed: "Navi Mumbai",
    foundingDate: `${siteConfig.foundedYear}`,
    department: services.map((service) => ({
      "@type": "MedicalBusiness",
      name: service.title,
      description: service.summary,
    })),
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      knowsAbout: member.specialties,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mental health services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          areaServed: "Navi Mumbai",
          serviceType: service.category,
        },
      })),
    },
    location: locations.map((location) => ({
      "@type": "Place",
      name: location.name,
      address: location.address,
      telephone: location.phoneDisplay,
      openingHours: location.hours,
    })),
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildServiceJsonLd(service: ParsedService) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.summary,
    url: `${siteConfig.domain}/services/${service.slug}`,
    areaServed: "Navi Mumbai",
    provider: {
      "@type": "MedicalClinic",
      name: siteConfig.legalName,
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
    },
  };
}
