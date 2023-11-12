import React from "react";
import ProductCard from "./ProductCard";

const Card: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <ProductCard productId="1" />
      <ProductCard productId="2" />
      <ProductCard productId="3" />
      
    </div>
  );
};

export default Card;
