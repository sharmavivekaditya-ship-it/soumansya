import { cache } from "react";
import type {
  Location,
  Service,
  TeamMember,
  Testimonial,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ParsedService = Omit<Service, "focusAreas" | "careIncludes" | "bestFor"> & {
  focusAreas: string[];
  careIncludes: string[];
  bestFor: string[];
};

type ParsedTeamMember = Omit<TeamMember, "specialties"> & {
  specialties: string[];
};

type ParsedLocation = Omit<Location, "neighbourhoods"> & {
  neighbourhoods: string[];
};

function splitMultiline(value: string) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseService(service: Service): ParsedService {
  return {
    ...service,
    focusAreas: splitMultiline(service.focusAreas),
    careIncludes: splitMultiline(service.careIncludes),
    bestFor: splitMultiline(service.bestFor),
  };
}

function parseTeamMember(member: TeamMember): ParsedTeamMember {
  return {
    ...member,
    specialties: splitMultiline(member.specialties),
  };
}

function parseLocation(location: Location): ParsedLocation {
  return {
    ...location,
    neighbourhoods: splitMultiline(location.neighbourhoods),
  };
}

export const getServices = cache(async () => {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return services.map(parseService);
});

export const getFeaturedServices = cache(async () => {
  const services = await prisma.service.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });

  return services.map(parseService);
});

export const getServiceBySlug = cache(async (slug: string) => {
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  return service ? parseService(service) : null;
});

export const getTeamMembers = cache(async () => {
  const members = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return members.map(parseTeamMember);
});

export const getLocations = cache(async () => {
  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return locations.map(parseLocation);
});

export const getTestimonials = cache(async () => {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return testimonials;
});

export type { ParsedLocation, ParsedService, ParsedTeamMember, Testimonial };
