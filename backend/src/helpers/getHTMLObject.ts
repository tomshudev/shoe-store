import cheerio from "cheerio";

// This function returns the Cheerio object that we use to scrape the web page,
// it fetched the HTML for the page and then lets Cheerio to load the model and
// we return it so the extraction model can scrape what they need
export const getHTMLObject = async (url: string): Promise<cheerio.Root> => {
  const res = await fetch(url);
  const text = await res.text();

  const $ = cheerio.load(text);

  return $;
};
