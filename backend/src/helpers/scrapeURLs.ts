import { models } from "../models/models";
import { MappedURLs, Product } from "../types";

const CHUNK_SIZE = 9;

const scrapeChunk = (chunk: MappedURLs) => {
  return Promise.all(
    chunk.map((urlObj) => models[urlObj.domain].scrape(urlObj.url))
  );
};

async function* batchScrape(urls: MappedURLs, limit: number = CHUNK_SIZE) {
  for (let i = 0; i < urls.length; i += limit) {
    const batch = urls.slice(i, i + limit);

    const result = scrapeChunk(batch);

    yield result;
  }
}

export const scrapeURLs = async (mappedURLs: MappedURLs) => {
  const products: Product[] = [];

  const start = Date.now();

  for await (const batch of batchScrape(mappedURLs, CHUNK_SIZE)) {
    products.push(...batch);
  }

  console.log(`✅ It took ${Date.now() - start}ms to scrape all`);

  return products;
};
