const Carousel = () => {
  return (
    <div className="w-[80%]  mx-auto">
      <p className="text-xl text-center my-6 ">Our Featured Products</p>
      <div className="carousel ">
        <div id="item1" className="carousel-item w-[100%] h-[50vh] ">
          <img
            src="https://www.digitaltrends.com/wp-content/uploads/2023/02/Apple-headset-render-Ahmed-Chenni-2-1500.jpg?fit=720%2C720&p=1"
            className="w-full rounded-xl"
          />
        </div>
        <div id="item2" className="carousel-item w-[100%] h-[50vh]">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*D6MhO8vR2K8jR02O"
            className="w-full rounded-xl"
          />
        </div>
        <div id="item3" className="carousel-item w-[100%] h-[50vh]">
          <img
            src="https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg"
            className="w-full rounded-xl"
          />
        </div>
        <div id="item4" className="carousel-item w-[100%] h-[50vh]">
          <img
            src="https://netrinoimages.s3.eu-west-2.amazonaws.com/2023/05/02/1481692/444145/apple_macbook_pro_14_inch_silicon_2022_in_official_design_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_4568794_o.png"
            className="w-[100%] h-[50vh] rounded-xl"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
};

export default Carousel;
