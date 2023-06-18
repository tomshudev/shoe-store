import express, { Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  Product,
  ProductsMap,
  ProductsRequest,
  ScrapeRequest,
  ScrapingBody,
} from "./types";
import { mapAndFilterURLs } from "./helpers/mapAndFilterURLs";
import { scrapeURLs } from "./helpers/scrapeURLs";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let productsMap: ProductsMap = {};

app.get("/health", (_req, res) => {
  res.send("Server is up and running");
});

// This is the route for the scraping functionality, it gets an array of urls,
// scrape them and store the results in the products map
app.post("/scrape", async (req: ScrapeRequest, res, next) => {
  const body = req.body;

  // First we are classifying the urls, we filter out every item which is not a valid
  // url and then we are extracting the domain for each url
  const mappedURLs = mapAndFilterURLs(body.urls);

  try {
    // Scraping all the urls and recieving a products array
    const products = await scrapeURLs(mappedURLs);

    // Making the products array as a map so we won't have the same product twice
    const mapedProducts = products.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: curr }),
      {} as ProductsMap
    );

    productsMap = { ...productsMap, ...mapedProducts };

    res.send(`Scrape urls successfully, scraped ${products.length} items`);
  } catch (e) {
    next(e);
  }
});

// This route returns a products array, this route can get a string to query by
app.get("/products", (req: ProductsRequest, res) => {
  let productsResponse = Object.values(productsMap);

  // If the user wants to query products
  if (req.query.query) {
    // Filteting the products by seatching a product name with the seached value
    productsResponse = productsResponse.filter((p) =>
      p.name.toLowerCase().includes(req.query.query.toLowerCase())
    );
  }

  res.send({ products: productsResponse });
});

app.listen(3001, () => {
  console.log("Server is up on port 3001 🚀");
});
