import type { MetadataRoute } from "next";

const baseUrl = "https://recoveryaltitude.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/programs", "/altitude-wellness", "/recovery-support", "/approach", "/resources", "/about"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
