import { FC, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/fetchProducts";
import { useDebounce } from "use-debounce";
import Product from "./Product";
import PagesNavigator from "./PagesNavigator";

const PAGE_SIZE = 10;

const Products: FC = () => {
  const [currPage, setCurrPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery(["/products", debouncedSearchValue], {
    queryFn: async () => await fetchProducts(debouncedSearchValue),
  });

  // Calculating the amount of pages we have according to the configurable page size
  // and the amount of products we have
  const pagesCount = useMemo(
    () => Math.ceil(products?.length / PAGE_SIZE) || 1,
    [products]
  );

  return (
    <div className="flex flex-col gap-y-2 p-2">
      <input
        className="bg-[#fff] border-solid w-52 focus:border-blue-600 border-[1px] outline-none rounded-md p-1 duration-75"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search product name..."
      />
      {isLoading || (isFetching && !products) ? (
        <div>Loading products...</div>
      ) : products.length === 0 ? (
        <div>No products found...</div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {/* 
                We slice the products to the products that should be visible according
                to the current page
            */}
          {products
            .slice(currPage * PAGE_SIZE, currPage * PAGE_SIZE + PAGE_SIZE)
            .map((p, index) => (
              <Product product={p} key={index} />
            ))}
          <PagesNavigator
            pagesCount={pagesCount}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
