import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rellax from "rellax";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import SearchInput from "../SearchInput/SearchInput";
import { useSelector } from "react-redux";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const cart = useSelector((state: { cart: any }) => state.cart);
  console.log(cart);
  const rellaxRef = useRef(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (rellaxRef.current) {
      const rellaxInstance = new Rellax(rellaxRef.current, {
        speed: -2,
      });

      return () => {
        rellaxInstance.destroy();
      };
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the "/home" route after successful logout
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full border border-2 p-2 bg-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center container mx-auto">
        <div className="flex items-center mb-4 sm:mb-0">
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="35"
            viewBox="0 0 48 48"
            className="mx-auto"
          >
            <path
              fill="#2684ff"
              d="M44.412,12.968c0.453-0.737,0.961-1.593,1.393-2.274c0.387-0.652,0.179-1.494-0.467-1.892	l-9.057-5.564c-0.638-0.429-1.504-0.261-1.934,0.377c-0.018,0.027-0.035,0.054-0.051,0.082c-0.362,0.605-0.829,1.391-1.338,2.233	c-3.588,5.912-7.197,5.189-13.703,2.087l-8.952-4.243c-0.695-0.33-1.526-0.035-1.857,0.658C8.441,4.444,8.435,4.456,8.429,4.469	l-4.312,9.738c-0.305,0.695,0.005,1.506,0.697,1.822c1.895,0.89,5.664,2.664,9.057,4.299C26.104,26.239,36.477,25.843,44.412,12.968	z"
            ></path>
            <path
              fill="#2684ff"
              d="M3.588,36.032c-0.453,0.737-0.961,1.593-1.393,2.274c-0.387,0.652-0.179,1.494,0.467,1.892	l9.057,5.564c0.638,0.429,1.504,0.261,1.934-0.377c0.018-0.027,0.035-0.054,0.051-0.082c0.362-0.605,0.829-1.391,1.338-2.233	c3.588-5.912,7.197-5.189,13.703-2.087l8.952,4.243c0.695,0.33,1.526,0.035,1.857-0.658c0.006-0.012,0.012-0.025,0.017-0.037	l4.312-9.738c0.305-0.695-0.005-1.506-0.697-1.822c-1.895-0.89-5.664-2.664-9.057-4.299C21.896,22.761,11.523,23.157,3.588,36.032z"
            ></path>
          </svg>
          Mart Store
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="btn-sm sm:btn-md lg:btn-lg">Dashboard</button>
              </Link>
              <Link to="/all-products">
                <button className="btn-sm sm:btn-md lg:btn-lg">All Products</button>
              </Link>
              <Link to="/contact">
                <button className="btn-sm sm:btn-md lg:btn-lg">Contact Us</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <button className="btn-sm sm:btn-md lg:btn-lg">Home</button>
              </Link>
              <Link to="/all-products">
                <button className="btn-sm sm:btn-md lg:btn-lg">All Products</button>
              </Link>
              <Link to="/contact">
                <button className="btn-sm sm:btn-md lg:btn-lg">Contact Us</button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center flex-col sm:flex-row">
          <div className="mr-2 mb-2 sm:mb-0">
            <SearchInput />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {user ? (
              <>
                <Link to="/cart">
                  <div className="flex items-center justify-center border font-bold p-2 sm:p-[13px] gap-2 rounded-md text-sm border-violet-500 text-violet-500 hover:bg-violet-600 active:bg-violet-700 hover:text-white">
                    <i className="fas fa-shopping-cart text-center"></i>cart
                  </div>
                </Link>
                <button
                  className="btn btn-outline btn-error mt-2 sm:mt-0"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary rounded mt-2 sm:mt-0">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-secondary rounded mt-2 sm:mt-0">
                    SignUp
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
