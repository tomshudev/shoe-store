import { ExtractionModel } from "../types";
import { AmazonExtractionModel } from "./amazon";
import { EbayExtractionModel } from "./ebay";

// This is a map between a domain and an extraction model
export const models: { [key: string]: ExtractionModel } = {
  "amazon.com": AmazonExtractionModel,
  "ebay.com": EbayExtractionModel,
};
