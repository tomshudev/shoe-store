import axios from "axios";
import { SERVER_URL } from "./constants";

export const scrapeURLs = async (
  urls: string[]
): Promise<{ status: string }> => {
  const result = await axios
    .post(`${SERVER_URL}/scrape`, {
      urls,
    })
    .then(() => ({ status: "ok" }))
    .catch(() => ({ status: "failure" }));

  return result;
};
