import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth as firebaseAuth } from "../../utils/firebase";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        email.value,
        password.value
      );
      console.log("User successfully logged in.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      console.log("User successfully logged in with Google:", user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-gray-200 w-[95%] rounded  mx-auto min-h-screen flex items-center justify-center">
        <div className="bg-base-100 w-full max-w-md p-8 rounded-lg shadow-lg space-y-4">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <button className="btn btn-primary w-full mt-3">Login</button>
            </div>
          </form>
          <div className="form-control">
            <button
              className="btn btn-secondary w-full"
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </button>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
