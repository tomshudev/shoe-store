import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/fetchProducts";
import { useDebounce } from "use-debounce";
import Product from "./Product";

const Products: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery(["/products", debouncedSearchValue], {
    queryFn: async () => await fetchProducts(debouncedSearchValue),
  });

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
          {products.map((p, index) => (
            <Product product={p} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
