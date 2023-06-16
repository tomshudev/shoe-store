import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { scrapeURLs } from "../../api/scrapeURLs";
import { URLRow } from "./URLRow";

const URLsSelector: FC = () => {
  const [urls, setURLs] = useState<string[]>([]);
  const scrapeDisabled = urls.length === 0;
  const queryClient = useQueryClient();
  const { mutate, isLoading, data } = useMutation({
    mutationFn: scrapeURLs,
    onSettled: () => {
      queryClient.invalidateQueries();
    },
    mutationKey: ["/scrape/urls"],
  });

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <URLRow
        onUrlAdded={(url) => {
          // Setting the urls while filtering equals urls
          setURLs(Array.from(new Set([...urls, url])));
        }}
      />
      <div>
        <div className="text-lg">URLs:</div>
        <ul className="list-disc ml-8">
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      </div>
      <button
        disabled={scrapeDisabled}
        className={`p-2 rounded-lg w-28 bg-green-500 outline-none border-none hover:bg-green-600 duration-100 ${
          scrapeDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => mutate(urls)}
      >
        Scrape
      </button>
      {isLoading ? (
        <div>Scraping...</div>
      ) : (
        !isLoading &&
        data && (
          <div>
            Scraping {data.status === "ok" ? "was successful" : "failed!"}
          </div>
        )
      )}
    </div>
  );
};

export default URLsSelector;
