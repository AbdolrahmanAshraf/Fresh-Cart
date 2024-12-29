import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function CategorySlider() {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getCategories = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        setError("Failed to load categories. Please try again.");
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-5">
      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <div key={category._id} className="text-center p-2">
            <img
              className="category-img w-full object-cover rounded-md shadow-md"
              src={category.image}
              alt={category.name}
            />
            <h3 className="mt-2 text-sm font-semibold text-gray-800">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
