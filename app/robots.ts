import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },

    sitemap: "https://ticowegreenafrica.com/sitemap.xml",
  };
}