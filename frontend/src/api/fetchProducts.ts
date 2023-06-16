import { SERVER_URL } from "./constants";
import { Product } from "./types";
import axios from "axios";

export const fetchProducts = async (
  searchValue: string | undefined
): Promise<Product[]> => {
  const result = await axios
    .get(`${SERVER_URL}/products`, {
      params: {
        query: searchValue,
      },
    })
    .then((data) => {
      console.log(data.data);
      return data.data.products as Product[];
    });
  // .catch(() => ({ status: "failure" }));

  return result;
};
