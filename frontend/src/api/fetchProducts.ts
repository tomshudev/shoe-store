import { SERVER_URL } from "./constants";
import { Product } from "./types";
import axios from "axios";

// This function fetches the products using axios, it passes a query
// if the user types something, it retruns an array of products
export const fetchProducts = async (
  searchValue: string | undefined
): Promise<Product[]> => {
  const result = await axios
    .get(`${SERVER_URL}/products`, {
      params: {
        query: searchValue,
      },
    })
    .then((data) => data.data.products as Product[]);

  return result;
};
