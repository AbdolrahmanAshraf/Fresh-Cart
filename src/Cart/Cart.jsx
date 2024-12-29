import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let [cartData, setCartData] = useState(null);
  let { getAllCart, deleteProduct, clearProducts, updateProductQuantity, setCartCount } = useContext(CartContext);
  let [loading, setLoading] = useState(true); 

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    setLoading(true); 
    let req = await getAllCart().catch((err) => {
      if (err.response.data.statusMsg === "fail") {
        setCartData(null);
      }
    });

    if (req?.data.data.products.length > 0) {
      setCartData(req?.data.data);
      setCartCount(req.data.numOfCartItems);
    } else {
      setCartData(null);
    }

    setLoading(false);
  }

  async function deleteItem(id) {
    let { data } = await deleteProduct(id).catch((err) => {
      console.log(err);
    });
    if (data.status === "success") {
      if (data.data.products.length > 0) {
        toast.error("Item Has Been Removed From Cart");
        setCartData(data.data);
      } else {
        setCartData(null);
      }
    }
  }

  async function clearCart() {
    let { data } = await clearProducts().catch((err) => { console.log(err); });
    if (data.message === "success") {
      setCartData(null);
      toast("Wow.. Such Empty!");
    }
  }

  async function updateCount(id, count) {
    if (count > 0) {
      let { data } = await updateProductQuantity(id, count).catch((err) => {
        console.log(err);
      });
      setCartData(data.data);
    } else {
      deleteItem(id);
    }
  }

  return (
    <div className="container cart mx-auto mt-8 px-4">
      {/* Loading Spinner */}
      {loading && (
        <div className="loading fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <i className="fa-solid fa-spinner fa-spin fa-5x text-white"></i>
        </div>
      )}
      <Toaster />
      {cartData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">Your Shopping Cart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartData.products.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-1/3">
                    <img className="w-full h-32 object-cover rounded-md" src={item.product.imageCover} alt={item.product.title} />
                  </div>
                  <div className="w-2/3">
                    <h6 className="text-lg font-semibold text-gray-800">{item.product.title}</h6>
                    <p className="text-sm text-gray-600">{item.price} EGP</p>
                    <button
                      onClick={() => { deleteItem(item.product._id); }}
                      className="mt-2 text-red-500 hover:text-red-700 text-sm">
                      <i className="fa-regular fa-trash-can mr-2"></i>Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => { updateCount(item.product._id, item.count - 1); }}
                      className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition duration-300">
                      -
                    </button>
                    <span className="text-lg text-gray-800">{item.count}</span>
                    <button
                      onClick={() => { updateCount(item.product._id, item.count + 1); }}
                      className="bg-main text-white px-3 py-1 rounded-full text-sm hover:bg-main-dark transition duration-300">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-main">Total Price: <span className="text-2xl">{cartData.totalCartPrice} EGP</span></h3>
            <div className="space-x-4">
              <Link
                to={`/checkout/${cartData._id}`}
                className="bg-main text-black py-3 px-8 rounded-lg shadow-lg hover:bg-main-dark transition duration-300">
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger text-center text-lg font-semibold text-red-600">
          Your Cart is Empty
        </div>
      )}
    </div>
  );
}
