import { models } from "../models/models";
import { MappedURLs, Product } from "../types";

const CHUNK_SIZE = 9;

// This function gets a chunk of urls (subset of the total urls to scrape), it
// returns a promise of products array, once all the chunk have finished scraping
// the promise will be resolved
const scrapeChunk = (chunk: MappedURLs) => {
  return Promise.all(
    chunk.map((urlObj) => models[urlObj.domain].scrape(urlObj.url))
  );
};

// This function takes the full urls array and the size for a chunk, it then
// divides the full array into subset according to the wanted size and resolves each
// chunk at a time
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

  // Waiting for all chunks to be done, after each we add the resolve products
  // into the products array
  for await (const chunk of batchScrape(mappedURLs, CHUNK_SIZE)) {
    products.push(...chunk);
  }

  // Logging the time it tok to scrape
  console.log(`✅ It took ${Date.now() - start}ms to scrape all`);

  return products;
};
