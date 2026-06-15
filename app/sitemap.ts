import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { industries } from "@/lib/industries";
import { posts } from "@/lib/posts";
import { whitepapers } from "@/lib/whitepapers";
import { projects } from "@/lib/work";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/solutions",
    "/our-work",
    "/industries",
    "/about-us",
    "/careers",
    "/contact-us",
    "/consultant",
    "/privacy-policy",
    "/resources",
    "/resources/blog",
    "/resources/white-papers",
  ];
  const now = new Date();
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, lastModified: now })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, lastModified: now })),
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}`, lastModified: now })),
    ...posts.map((p) => ({ url: `${site.url}/resources/blog/${p.slug}`, lastModified: now })),
    ...whitepapers.map((w) => ({ url: `${site.url}/resources/white-papers/${w.slug}`, lastModified: now })),
    ...projects.map((p) => ({ url: `${site.url}/our-work/${p.slug}`, lastModified: now })),
  ];
}
