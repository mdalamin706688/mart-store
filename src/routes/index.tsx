import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Home from "../components/home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { auth as firebaseAuth } from "../utils/firebase";
import AllProducts from "../components/allProducts/AllProducts";
import Cart from "../components/cart/Cart";
import ProductDetails from "../components/productsDetails/ProductDetails";
import ContactUs from "../components/contact/ContactUs";
import SearchInput from "../components/SearchInput/SearchInput";

function AppRoutes() {
  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setAuthResolved(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authResolved) {
   
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchInput/>} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/cart" element={user ? <Cart></Cart> : <Navigate to="/login"/>} />
      <Route
        path="/products/:productId"
        element={<ProductDetails></ProductDetails>}
      />
      <Route path="/contact" element={<ContactUs></ContactUs>}/>
    </Routes>
  );
}

export default AppRoutes;
