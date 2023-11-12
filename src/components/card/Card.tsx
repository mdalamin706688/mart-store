import React from "react";
import ProductCard from "./ProductCard";

const Card: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <ProductCard productId="1" />
      <ProductCard productId="2" />
      <ProductCard productId="3" />
      <ProductCard productId="4" />
      <ProductCard productId="5" />
      <ProductCard productId="6" />
      <ProductCard productId="7" />
      <ProductCard productId="8" />
    </div>
  );
};

export default Card;
