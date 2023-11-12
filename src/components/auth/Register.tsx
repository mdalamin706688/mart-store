import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth as firebaseAuth } from "../../utils/firebase"; // Import Firebase auth instance
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        email.value,
        password.value
      );
      console.log("User successfully registered.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="bg-gray-200 rounded  min-h-screen w-[95%] flex items-center justify-center mx-auto">
        <div className="bg-base-100 w-full max-w-md p-8 rounded shadow-lg space-y-4">
          <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
          <form onSubmit={handleSignUp}>
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
              <button className="btn btn-primary w-full mt-3">Sign Up</button>
            </div>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Register;
