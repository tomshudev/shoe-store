import { getHTMLObject } from "../helpers/getHTMLObject";
import { ExtractionModel } from "../types";

export const EbayExtractionModel: ExtractionModel = {
  scrape: async (url) => {
    const $ = await getHTMLObject(url);

    const title = $('[data-testid="x-item-title"]').text();
    const priceString = $('[data-testid="x-price-primary"]')
      .text()
      .replace(/[^0-9\.]/g, "");

    return {
      name: title,
      price: [parseFloat(priceString)],
      originUrl: url,
    };
  },
};
