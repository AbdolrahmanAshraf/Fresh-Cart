import React from 'react';

export default function Notfound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
        <p className="text-3xl text-red-500">Oops! Page not found.</p>
        <p className="text-xl text-gray-600">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-6 inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-600">
          Go Home
        </a>
      </div>
    </div>
  );
}
