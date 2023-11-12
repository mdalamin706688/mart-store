import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../utils/api";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { auth, firestore } from "../../utils/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";

const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [alert, setAlert] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId)
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setProduct(null);
        });
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % product.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = async () => {
    if (!user) {
      setAlert({
        type: ALERT_TYPES.ERROR,
        message: "Please login to add items to the cart.",
      });
    } else {
      try {
        const user = auth.currentUser;
        if (user) {
          const orderRef = collection(firestore, `users/${user.uid}/cart`);
          const productDetails = {
            productId: product.id,
            quantity: 1,
            name: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
          };
          await addDoc(orderRef, productDetails);

          setAlert({
            type: ALERT_TYPES.SUCCESS,
            message: "Successfully added to cart!",
          });
        } else {
          setAlert({
            type: ALERT_TYPES.ERROR,
            message: "You must be logged in to add items to the cart.",
          });
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        setAlert({
          type: ALERT_TYPES.ERROR,
          message: "An error occurred while adding the item to the cart.",
        });
      }
    }

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <>
      <Header />
      <div className="card w-full md:w-[80%] lg:w-[60%] mx-auto card-side bg-base-100 shadow-xl mt-4">
        <div className="carousel w-full relative">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item relative w-full ${currentSlide === index ? 'block' : 'hidden'}`}
            >
              <img src={image} className="w-full h-80 rounded-md" alt={product.title} />
            </div>
          ))}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button className="btn btn-circle" onClick={prevSlide}>❮</button>
            <button className="btn btn-circle" onClick={nextSlide}>❯</button>
          </div>
        </div>
      </div>
      <div className="card-body w-full md:w-[80%] lg:w-[60%] mx-auto shadow-lg rounded-md mb-4">
        <h2 className="card-title text-3xl font-semibold">{product.title}</h2>
        <p className="text-gray-600 text-lg">{product.description}</p>
        <p className="text-xl font-semibold mb-4">Price: ${product.price.toFixed(2)}</p>
        <p className="text-xl font-semibold">Rating: {product.rating}</p>
        <p className="text-xl font-semibold">Stock: {product.stock} available</p>
        <p className="text-xl font-semibold">Brand: {product.brand}</p>
        <p className="text-xl font-semibold">Category: {product.category}</p>

        <div className="card-actions justify-end mt-6">
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />

      {alert && (
        <div
          className={`fixed bottom-0 right-0 p-4 m-4 bg-${
            alert.type === ALERT_TYPES.SUCCESS ? "green" : "red"
          }-500 text-white rounded-lg`}
        >
          {alert.message}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
