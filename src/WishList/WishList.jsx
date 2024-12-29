import React, { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function WishList() {
    const [wishListData, setWishListData] = useState([]);
    const { getWishList, deleteItemFromWishList } = useContext(WishListContext);
    const { addProductToCart, setCartCount } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishList();
    }, []);

    const fetchWishList = async () => {
        setLoading(true);
        try {
            const { data } = await getWishList();
            setWishListData(data.data);
        } catch (error) {
            console.error('Error fetching wish list:', error);
            toast.error('Failed to load wish list.');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (id) => {
        try {
            const { data } = await addProductToCart(id);
            if (data.status === 'success') {
                setCartCount(data.numOfCartItems);
                toast.success(data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };

    const removeProduct = async (id) => {
        try {
            const { data } = await deleteItemFromWishList(id);
            if (data.status === 'success') {
                toast.error('Item has been removed from the wish list');
                fetchWishList();
            }
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('Failed to remove item.');
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <Toaster />
            {loading && (
                <div className="loading fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <i className="fa-solid fa-spinner fa-spin fa-5x text-white"></i>
                </div>
            )}
            {wishListData.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Your Wish List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishListData.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-1/3">
                                        <img
                                            className="w-full h-32 object-cover rounded-md"
                                            src={item.imageCover}
                                            alt={item.slug}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <h6 className="text-lg font-semibold text-gray-800">{item.slug}</h6>
                                        <p className="text-sm text-gray-600">{item.price} EGP</p>
                                        <button
                                            onClick={() => removeProduct(item._id)}
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                                        >
                                            <i className="fa-regular fa-trash-can mr-2"></i>Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={() => addToCart(item._id)}
                                        className="bg-main text-white px-3 py-2 rounded-lg hover:bg-main-dark transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="alert alert-danger text-center text-lg font-semibold text-red-600 py-4 rounded-lg bg-red-100"
                >
                    Your Wish List Is Empty
                </div>
            )}
        </div>
    );
}
