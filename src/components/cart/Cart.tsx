import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { auth as firebaseAuth } from "../../utils/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/cart/store";
import {
  clearCart,
  removeFromCart,
  setCart,
  updateQuantity,
} from "../../redux/cart/cartSlice";
import { Helmet } from "react-helmet-async";

function Cart() {
  const app = firebaseAuth.app;
  const db = getFirestore(app);
  const navigate = useNavigate();
  const user = firebaseAuth.currentUser;

  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const user = firebaseAuth.currentUser;

    if (user) {
      const cartQuery = query(collection(db, `users/${user.uid}/cart`));

      const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
        const items: {
          [x: string]: any;
          id: string;
        }[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        // Dispatch an action to set the cart items in the Redux store
        dispatch(setCart(items));

        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [db, user, dispatch]);

  // Listen for authentication state changes to clear cart on logout
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // User is logged out, clear the cart
        dispatch(clearCart());
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      if (item.price && item.quantity) {
        total += item.price * item.quantity;
      }
    }
    return total.toFixed(2);
  };

  const removeItem = async (itemId: string) => {
    try {
      dispatch(removeFromCart(itemId));
      if (user) {
        await deleteDoc(doc(db, `users/${user.uid}/cart`, itemId));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantityInCart = async (
    itemId: string,
    newQuantity: number
  ) => {
    try {
      if (newQuantity > 0) {
        // Update the quantity in the Redux store
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));

        // Update the quantity in Firestore
        if (user) {
          const itemDoc = doc(db, `users/${user.uid}/cart`, itemId);
          await updateDoc(itemDoc, { quantity: newQuantity });
        }
      } else {
        // If the new quantity is 0 or negative, remove the item
        removeItem(itemId);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const proceedToPayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
    } else {
      try {
        if (user) {
          const orderRef = collection(db, `users/${user.uid}/orders`);
          const paymentDetails = {
            items: cartItems,
            timestamp: new Date().toLocaleString(),
          };

          await addDoc(orderRef, paymentDetails);

          // Clear the cart
          await Promise.all(
            cartItems.map(async (item) => {
              await deleteDoc(doc(db, `users/${user.uid}/cart`, item.id));
            })
          );

          alert("Payment Complete! Thank you for your purchase.");

          // Dispatch action to clear the cart in Redux store
          dispatch(clearCart());

          navigate("/dashboard");
        } else {
          alert("You must be logged in to place an order.");
        }
      } catch (error) {
        console.error("Error placing the order:", error);
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>Cart</title>
      </Helmet>
      <Header />
      <div className="p-4 w-[80%] mx-auto justify-between  rounded-md  min-h-screen">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-semibold mb-4">Cart Items</h1>
          <p className="text-2xl font-semibold">
            Total Price: ${calculateTotalPrice()}
          </p>
        </div>

        {loading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center ">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-300 p-6 shadow-md rounded-lg mb-4">
                <img
                  className="w-[100%] h-40 rounded-lg object-cover"
                  src={item.thumbnail}
                  alt={item.thumbnail}
                />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl my-2">{item.name}</p>
                    <p className="font-semibold text-center mb-2">
                      Price: ${item.price}
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() =>
                          updateQuantityInCart(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <p className="text-xl">{item.quantity}</p>
                      <button
                        onClick={() =>
                          updateQuantityInCart(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* <div className="mt-4">
          <button
            onClick={proceedToPayment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </div> */}
      </div>

      {/* Custom styled alert */}
      {showAlert && (
        <div className="fixed bottom-0 right-0 p-4 m-4 bg-green-500 text-black rounded">
          Payment Complete! Thank you for your purchase.
          <button className="ml-2" onClick={() => setShowAlert(false)}>
            Close
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Cart;
