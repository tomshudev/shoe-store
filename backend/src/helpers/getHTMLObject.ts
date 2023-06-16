import cheerio from "cheerio";

export const getHTMLObject = async (url: string): Promise<cheerio.Root> => {
  const res = await fetch(url);
  const text = await res.text();
  const $ = cheerio.load(text);

  return $;
};
