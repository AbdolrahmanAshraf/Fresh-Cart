import React from "react";
import sliderimg1 from "../Images/slider-image-1.jpeg";
import sliderimg2 from "../Images/slider-image-2.jpeg";
import sliderimg3 from "../Images/slider-image-3.jpeg";
import sliderimg4 from "../Images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import sliderimg5 from "../Images/1681511121316.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const sliderSettings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className=" my-10 flex items-center justify-center m-0 p-0">
      <div className="w-full max-w-7xl">
        <div className="flex">
          {/* Main Slider */}
          <div className="w-3/4">
            <Slider {...sliderSettings}>
              {[sliderimg1, sliderimg2, sliderimg3].map((image, index) => (
                <div key={index}>
                  <img
                    className="h-[400px] w-full"
                    src={image}
                    alt={`Slider ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Sub-Images */}
          <div className="w-1/4">
            <div>
              <img
                className="h-[200px] w-full"
                src={sliderimg5}
                alt="Sub Image 1"
              />
            </div>
            <div>
              <img
                className="h-[200px] w-full"
                src={sliderimg4}
                alt="Sub Image 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
