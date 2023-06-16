import { getHTMLObject } from "../helpers/getHTMLObject";
import { ExtractionModel } from "../types";

export const AmazonExtractionModel: ExtractionModel = {
  scrape: async (url) => {
    const $ = await getHTMLObject(url);

    const getPrices = (): number[] | null => {
      const priceBlock = $("#corePrice_desktop");

      if (priceBlock.length && priceBlock.find(".a-price").length >= 1) {
        if (priceBlock.find(".a-price").length === 1) {
          return [
            parseFloat(priceBlock.find(".a-price").text().replace("$", "")),
          ];
        } else {
          return [
            parseFloat(
              priceBlock.find(".a-price").eq(0).text().replace("$", "")
            ),
            parseFloat(
              priceBlock.find(".a-price").eq(1).text().replace("$", "")
            ),
          ];
        }
      } else {
        return null;
      }
    };

    return {
      name: $("#productTitle").text().trim(),
      price: getPrices(),
      originUrl: url,
    };
  },
};
