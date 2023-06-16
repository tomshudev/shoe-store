import { ExtractionModel } from "../types";
import { AmazonExtractionModel } from "./amazon";
import { EbayExtractionModel } from "./ebay";

export const models: { [key: string]: ExtractionModel } = {
  "amazon.com": AmazonExtractionModel,
  "ebay.com": EbayExtractionModel,
};
