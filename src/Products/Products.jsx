import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../Context/WishListContext";

async function fetchFeaturedProducts(page) {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
  );
  return data.data;
}

export default function Products() {
  const { addProductToWishList } = useContext(WishListContext);
  const { addProductToCart, setCartCount } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts(1)
      .then((data) => {
        setProducts(data);
        setProducts2(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setIsLoading(true);
    fetchFeaturedProducts(page)
      .then((data) => {
        setProducts(data);
        setProducts2(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  function search(event) {
    let searchValue = event.target.value.toLowerCase();
    let filteredProducts = products2.filter((el) =>
      el.title.toLowerCase().includes(searchValue)
    );
    setProducts(filteredProducts);
  }

  async function addCart(id) {
    try {
      const { data } = await addProductToCart(id);
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addToMyWishList(id, e) {
    try {
      const { data } = await addProductToWishList(id);
      e.target.classList.add("text-red-500");
      toast.success(data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Toaster />
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <i className="fas fa-spinner fa-spin fa-5x text-green"></i>
        </div>
      )}

      <div className="p-6">
        {/* Search Bar */}
        <div className="flex justify-center my-4">
          <input
            onChange={(e) => search(e)}
            className="w-full max-w-screen-lg text-black bg-white border border-gray-300 rounded-lg shadow-md mt-4 px-6 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            type="text"
            placeholder="🔍 Search For Products"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {error ? (
            <p className="text-red-500">Error loading products: {error}</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="relative p-7 mb-10 border rounded-lg shadow-md group transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to={`/ProductDetails/${product._id}`} className="block relative z-0">
                  <img
                    className="w-full h-48 object-cover mb-4 transition-transform duration-300 group-hover:scale-105"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="text-sm font-semibold text-green-500">
                    {product.category.name}
                  </span>
                  <h3 className="text-gray-800 font-bold text-lg my-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>{product.price} EGP</span>
                    <span className="flex items-center">
                      <i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage}
                    </span>
                  </div>
                </Link>

                {/* Hidden buttons section */}
                <div className="absolute top-[calc(100%-2px)] left-0 w-full transform translate-y-1/2 transition-all duration-300 ease-in-out group-hover:translate-y-0 opacity-0 group-hover:opacity-100 flex justify-center items-center space-x-3 bg-white">
                  <button
                    onClick={() => addCart(product._id)}
                    className="w-full bg-green-700 text-white p-2 hover:bg-green-900 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <i
                    onClick={(e) => addToMyWishList(product._id, e)}
                    className="fas fa-heart text-xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                  ></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <nav className="mt-5 flex justify-center items-center" aria-label="Page navigation example">
        <ul className="flex space-x-2">
          <li>
            <button
              className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
