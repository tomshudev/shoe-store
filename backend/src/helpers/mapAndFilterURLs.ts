import { MappedURLs } from "../types";
import { SUPPORTED_DOMAINS } from "./constants";

export const mapAndFilterURLs = (urls: string[]): MappedURLs => {
  const validUrls = urls.filter((url) =>
    url.match(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
  );

  const urlsWithDomainMap = validUrls.map((url) => ({
    url,
    domain: new URL(url).hostname.replace("www.", ""),
  }));

  const supportedUrls = urlsWithDomainMap.filter(({ domain }) =>
    SUPPORTED_DOMAINS.includes(domain)
  );

  return supportedUrls;
};
