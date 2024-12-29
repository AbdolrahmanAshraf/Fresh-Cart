import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MainSlider from "../MainSlider/MainSlider";
import { useQuery } from "react-query";
import { CartContext } from "../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../Context/WishListContext";

// Fetch products API function
async function fetchFeaturedProducts(page) {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
  return data.data;
}

export default function Home() {
  const { addProductToWishList } = useContext(WishListContext);
  const { addProductToCart, setCartCount } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  // Fetch products using react-query
  const { data, isLoading, error } = useQuery(
    ["featuredProducts", 1], 
    () => fetchFeaturedProducts(1),
    {
      onSuccess: (data) => {
        setProducts(data);
        setOriginalProducts(data);
      },
    }
  );

  // Search functionality
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredProducts = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    setProducts(filteredProducts);
  };

  // Add product to cart
  const handleAddToCart = async (id) => {
    try {
      const { data } = await addProductToCart(id);
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        toast.success(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  // Add product to wishlist
  const handleAddToWishList = async (id, event) => {
    try {
      const { data } = await addProductToWishList(id);
      event.target.classList.add("text-red-500");
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to wishlist");
    }
  };

  // Handle page change
  const handlePageChange = async (page) => {
    try {
      const newData = await fetchFeaturedProducts(page);
      setProducts(newData);
      setOriginalProducts(newData);
    } catch (err) {
      console.error("Failed to fetch products for page", page);
    }
  };

  return (
    <>
      <Toaster />
      <MainSlider />

      <div className="container mx-auto py-4 px-6">
        {/* Search Bar */}
        <div className="flex justify-center my-4">
          <input
            onChange={handleSearch}
            className="w-full max-w-screen-lg text-black bg-white border border-gray-300 rounded-lg shadow-md mt-4 px-6 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            type="text"
            placeholder="🔍 Search for products"
          />
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="loading absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-600">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-white"></i>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">Error loading products. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {products.map((product) => (
              <div key={product.id} className="card bg-white shadow-md rounded-lg w-full max-w-xs">
                <Link to={`/ProductDetails/${product._id}`} className="text-decoration-none">
                  <img
                    className="w-full h-56 object-cover rounded-t-lg"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <div className="p-4">
                    <span className="badge bg-main text-white py-1 px-3 rounded-full">{product.category.name}</span>
                    <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <div className="flex justify-between text-gray-700 items-center mt-3">
                      <span className="font-bold text-gray-700 text-xl">{product.price} EGP</span>
                      <span className="flex items-center text-yellow-500">
                        <i className="fas fa-star"></i> {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-4 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-green-700 text-white py-2 px-4 rounded-full hover:bg-green-900 w-full"
                    >
                      Add to Cart
                    </button>
                    <i
                      onClick={(e) => handleAddToWishList(product._id, e)}
                      className="fas fa-heart text-xl pl-3 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <nav className="mt-6">
          <ul className="flex justify-center space-x-4">
            <li>
              <button
                onClick={() => handlePageChange(1)}
                className="text-xl py-2 px-4 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                &laquo;
              </button>
            </li>
            {[1, 2].map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className="text-xl py-2 px-4 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(2)}
                className="text-xl py-2 px-4 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
