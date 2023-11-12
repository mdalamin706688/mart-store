// ProductCard.tsx
import React, { useState, useEffect } from "react";
import { fetchProductDetails } from "../../utils/api";
import { Link } from "react-router-dom";

interface ProductCardProps {
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card  bg-gray-300 shadow-xl">
      <div className="px-10 pt-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-xl h-40 w-[100%] mx-auto"
        />
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.description}</p>
        <div className="card-actions">
          <Link to={`/products/${product.id}`} >
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
