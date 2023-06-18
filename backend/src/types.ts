import { Request } from "express";

export type ScrapingBody = { urls: string[] };

export type MappedURLs = {
  url: string;
  domain: string;
}[];

export type ProductsMap = { [name: string]: Product };

export type Product = {
  name: string;
  price: number[] | null;
  originUrl: string;
};

export type ExtractionModel = {
  scrape: (url: string) => Promise<Product>;
};

export interface ScrapeRequest extends Request {
  body: ScrapingBody;
}

export interface ProductsRequest extends Request {
  query: {
    query?: string;
  };
}
