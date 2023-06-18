import { MappedURLs } from "../types";
import { SUPPORTED_DOMAINS } from "./constants";

export const mapAndFilterURLs = (urls: string[]): MappedURLs => {
  // Filteting all urls which are not valid
  const validUrls = urls.filter((url) =>
    url.match(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
  );

  // Mapping the urls to an object that contains the url and domain
  const urlsWithDomainMap = validUrls.map((url) => ({
    url,
    domain: new URL(url).hostname.replace("www.", ""),
  }));

  // Filtering all items which their domain is not supported
  const supportedUrls = urlsWithDomainMap.filter(({ domain }) =>
    SUPPORTED_DOMAINS.includes(domain)
  );

  return supportedUrls;
};
