import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/cart/cartReducers";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { auth, firestore } from "../../utils/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { Helmet } from 'react-helmet-async';


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

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);

  const [user, setUser] = useState<User | null>(null);

  const [alert, setAlert] = useState<{
    type: string;
    message: string;
  } | null>(null);

  // Check if a user is authenticated
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
    fetchProducts()
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        console.log("Fetched products data:", data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [filter, selectedCategory, minPrice, maxPrice, products]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const availableCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  availableCategories.unshift("All Categories");

  const handleAddToCart = async (event: React.MouseEvent, product: Product) => {
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
          const cartSnapshot = await getDocs(orderRef);
          const cartDocs = cartSnapshot.docs;

          // Check if the product is already in the cart
          const existingProduct = cartDocs.find(
            (doc) => doc.data().productId === product.id
          );

          if (existingProduct) {
            setAlert({
              type: ALERT_TYPES.ERROR,
              message:
                "Item already added to the cart. Go to the cart to view or update.",
            });
          } else {
            // If the product is not in the cart, add a new document
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
          }
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
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="w-[90%] mx-auto mt-8 mb-3 bg-gray-200 min-h-screen">
        {/* Filter inputs */}
        <div className="mb-4 space-y-2 md:space-y-0 md:space-x-2 md:flex lg:flex">
  <input
    type="text"
    placeholder="Filter by title"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="p-2 md:w-48 lg:w-64 border border-gray-300 rounded-lg"
  />
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="p-2 md:w-48 lg:w-64 border border-gray-300 rounded-lg"
  >
    {availableCategories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
  <input
    type="number"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    className="p-2 md:w-32 lg:w-40 border border-gray-300 rounded-lg"
  />
  <input
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    className="p-2 md:w-32 lg:w-40 border border-gray-300 rounded-lg"
  />
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts
            .slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage
            )
            .map((product) => (
              <div
                key={product.id}
                className="bg-gray-300  p-4 shadow-md rounded-lg flex flex-col justify-between"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {product.title}
                  </h2>
                  <p className=" flex-1 truncate">{product.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center mt-4">
                  <div className="text-cyan-700 font-bold mb-2 sm:mb-0 md:mb-0 lg:mb-0">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-yellow-600 mb-2 sm:mb-0 md:mb-0 lg:mb-0">
                    {product.rating} ★
                  </div>
                  <div className="flex space-x-2 mb-2 sm:mb-0 md:mb-0 lg:mb-0">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-sm btn-primary text-white rounded"
                    >
                      View Details
                    </Link>
                    {/* <button
                      onClick={(event) => handleAddToCart(event, product)}
                      className={`btn btn-sm btn-primary text-white rounded ${
                        user ? "" : "cursor"
                      }`}
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-4 flex justify-center">
          {Array.from({
            length: Math.ceil(filteredProducts.length / productsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 p-2 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              } rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />

      {/* Display the alert message */}
      {alert && (
        <div
          className={`fixed bottom-0 right-0 p-4 m-4 ${
            alert.type === ALERT_TYPES.SUCCESS ? "bg-green-500" : "bg-red-500"
          } text-white rounded-lg`}
        >
          {alert.message}
        </div>
      )}
    </>
  );
}

export default AllProducts;
