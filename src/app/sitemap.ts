import { siteConfig } from "@/common/configs/site";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/vi`,
      lastModified: new Date(),
    },
  ];
}