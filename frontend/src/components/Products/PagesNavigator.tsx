import { FC } from "react";

const PagesNavigator: FC<{
  currPage: number;
  setCurrPage: (func: (curr: number) => number) => void;
  pagesCount: number;
}> = ({ currPage, setCurrPage, pagesCount }) => {
  return (
    <div className="flex justify-between w-48">
      <button
        disabled={currPage === 0}
        className="bg-[#fff] border-[1px] border-solid border-[#000] rounded-md disabled:opacity-50 py-1 px-2"
        onClick={() => setCurrPage((curr) => curr - 1)}
      >
        prev
      </button>
      <button
        disabled={currPage + 1 === pagesCount}
        className="bg-[#fff] border-[1px] border-solid border-[#000] rounded-md disabled:opacity-50 py-1 px-2"
        onClick={() => setCurrPage((curr) => curr + 1)}
      >
        next
      </button>
    </div>
  );
};

export default PagesNavigator;
