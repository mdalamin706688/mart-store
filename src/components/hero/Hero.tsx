import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero w-[90%] mx-auto mt-4">
      <div
        className="hero min-h-screen rounded-lg bg-center bg-cover overflow-hidden"
        style={{
          backgroundImage:
            "url(https://9to5mac.com/wp-content/uploads/sites/6/2022/02/Apple-lineup.jpg?quality=82&strip=all&w=1600)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to our Mart Store</h1>
            <p className="mb-5">
              Explore a world of quality products and unbeatable prices. Our commitment is to provide you with the best shopping experience. 
            </p>
            <Link to="/all-products">
              <button className="btn btn-accent">Click Here</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
