import { FC } from "react";
import { Product as ProductType } from "../../api/types";

// Returns a renderable price for the component, price can be null
// or an array of two numbers, this Component handles all three scenarios
const Price: FC<{ price: number[] | null }> = ({ price }) => {
  if (!price) {
    return <span className="font-bold">N/A</span>;
  }

  return (
    <div>
      Price: <span>${price[0]}</span>
      {price.length > 1 && (
        <>
          <span>-</span>
          <span>${price[1]}</span>
        </>
      )}
    </div>
  );
};

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div className="flex flex-col gap-y-0">
      <a
        className="text-gray-700 underline"
        target="_blank"
        href={product.originUrl}
      >
        {product.name}
      </a>
      <Price price={product.price} />
    </div>
  );
};

export default Product;
