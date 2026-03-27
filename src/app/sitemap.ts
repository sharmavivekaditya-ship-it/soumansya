import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();

  const staticRoutes = ["", "/about", "/contact", "/services", "/team"].map(
    (path) => ({
      url: `${siteConfig.domain}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.domain}/services/${service.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
