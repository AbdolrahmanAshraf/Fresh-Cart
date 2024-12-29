import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../Stores/CategorySlice";

export default function Categories() {
  const { categoryList, isLoading, error } = useSelector(
    (state) => state.categoryData
  );
  const Disp = useDispatch();

  useEffect(() => {
    Disp(getAllCategory());
  }, [Disp]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-lg font-medium">
            Error loading categories: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden">
              <img
                src={category.image}
                className="w-full h-64 object-cover object-center transform transition duration-500 group-hover:scale-110"
                alt={category.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {category.name}
              </h3>
              <div className="mt-2 flex justify-center">
                <button className="text-sm text-green-700 hover:text-green-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Products →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}