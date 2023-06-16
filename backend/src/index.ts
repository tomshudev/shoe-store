import express, { Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Product, ProductsRequest, ScrapeRequest, ScrapingBody } from "./types";
import { mapAndFilterURLs } from "./helpers/mapAndFilterURLs";
import { scrapeURLs } from "./helpers/scrapeURLs";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let productsList: Product[] = [];

app.get("/health", (_req, res) => {
  res.send("Server is up and running");
});

app.post("/scrape", async (req: ScrapeRequest, res, next) => {
  const body = req.body;

  const mappedURLs = mapAndFilterURLs(body.urls);

  try {
    const products = await scrapeURLs(mappedURLs);
    productsList = products;

    res.send(`Scrape urls successfully, scraped ${products.length} items`);
  } catch (e) {
    next(e);
  }
});

app.get("/products", (req: ProductsRequest, res) => {
  let productsResponse = [...productsList];

  if (req.query.query) {
    productsResponse = productsResponse.filter((p) =>
      p.name.toLowerCase().includes(req.query.query.toLowerCase())
    );
  }

  res.send({ products: productsResponse });
});

app.listen(3001, () => {
  console.log("Server is up on port 3001 🚀");
});
