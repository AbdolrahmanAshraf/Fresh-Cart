import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load product details');
      setIsLoading(false);
    }
  }

  async function addCart(id) {
    try {
      let { data } = await addProductToCart(id);
      if (data.status === "success") {
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Failed to add to cart");
      console.log(err);
    }
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <i className="fas fa-spinner fa-spin fa-3x text-green-500"></i>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
              <Slider {...sliderSettings}>
                {product.images.map((image, index) => (
                  <div key={index} className="relative pb-[100%]">
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative pb-[100%] overflow-hidden rounded border-2 ${
                    selectedImage === index ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover hover:opacity-75 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              {/* Category */}
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Price and Rating */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price} EGP
                </span>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className=" text-gray-900 font-bold">{product.ratingsAverage}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addCart(product._id)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}