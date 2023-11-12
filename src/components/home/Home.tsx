import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../card/Card";
import Carousel from "../carousel/Caruosel";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Hero from "../hero/Hero";
import Testi from "../testimonials/Testi";
import { Helmet } from 'react-helmet-async';


const Home = () => {
  
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header></Header>
      <Hero></Hero>
      <div
        className="w-[80%] mx-auto mt-4 "
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p className="text-xl mb-4 text-center p-4">Our Main Products</p>
        <Card data-aos="fade-up" data-aos-duration="1000"></Card>
      </div>
      <div></div>
      <div
        className="w-[70%]  mx-auto my-4"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <Carousel data-aos="fade-up" data-aos-duration="2000"></Carousel>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="text-center w-[70%] mx-auto text-xl p-6"
      >
        <p>Ratings From Our Customers</p>
        <Testi data-aos="fade-up" data-aos-duration="2000"></Testi>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
