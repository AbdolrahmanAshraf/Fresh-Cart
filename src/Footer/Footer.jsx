import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-center text-lg-start text-gray-700 mt-5 bg-gray-100">
      <section className="flex justify-between p-4 bg-green-500 text-white">
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="flex space-x-4">
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-google"></i>
          </Link>
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link className="text-white hover:text-gray-200">
            <i className="fab fa-github"></i>
          </Link>
        </div>
      </section>

      <section>
        <div className="container mx-auto text-center text-md-start mt-5">
          <div className="grid md:grid-cols-4 gap-4 mt-3">
            <div className="mb-4">
              <h6 className="text-lg font-bold">Company name</h6>
              <hr className="mb-4 mt-2 w-16 mx-auto bg-purple-500 h-1" />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-lg font-bold">Products</h6>
              <hr className="mb-4 mt-2 w-16 mx-auto bg-purple-500 h-1" />
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">tailwindcss</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">postcss</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">autoprifixir</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">tailwind react</a>
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-lg font-bold">Useful links</h6>
              <hr className="mb-4 mt-2 w-16 mx-auto bg-purple-500 h-1" />
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">Your Account</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">Become an Affiliate</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">Shipping Rates</a>
              </p>
              <p>
                <a href="#!" className="text-gray-700 hover:text-gray-900">Help</a>
              </p>
            </div>

            <div className="mb-4">
              <h6 className="text-lg font-bold">Contact</h6>
              <hr className="mb-4 mt-2 w-16 mx-auto bg-purple-500 h-1" />
              <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
              <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-3 bg-gray-200">
        © 2020 Copyright:
        <a className="text-gray-700 hover:text-green-700" href="https://tailwindcss.com/">tailwindcss.com</a>
      </div>
    </footer>
  )
}
