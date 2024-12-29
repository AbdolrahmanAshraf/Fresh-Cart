import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import * as Yup from 'yup';

export default function CheckOut() {
  const { checkOutPayment } = useContext(CartContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    details: Yup.string()
      .min(10, 'Details must be at least 10 characters')
      .required('Details are required'),
    city: Yup.string()
      .required('City is required')
      .min(3, 'City must be at least 3 characters'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
      .required('Phone number is required'),
  });

  const shippingForm = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      await sendPayment(values);
    }
  });

  async function sendPayment(val) {
    try {
      setIsLoading(true);
      const { data } = await checkOutPayment(id, val);
      window.location.href = data.session.url;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-50 px-6 py-8 rounded-xl shadow-lg">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Checkout
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your shipping details
            </p>
          </div>

          <form onSubmit={shippingForm.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Shipping Address
              </label>
              <div className="mt-1">
                <textarea
                  id="details"
                  name="details"
                  rows="3"
                  onChange={shippingForm.handleChange}
                  onBlur={shippingForm.handleBlur}
                  value={shippingForm.values.details}
                  className={`appearance-none block w-full px-3 py-2 border text-gray-700 bg-white ${
                    shippingForm.touched.details && shippingForm.errors.details
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {shippingForm.touched.details && shippingForm.errors.details && (
                  <p className="mt-1 text-sm text-red-600">{shippingForm.errors.details}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  id="city"
                  name="city"
                  type="text"
                  onChange={shippingForm.handleChange}
                  onBlur={shippingForm.handleBlur}
                  value={shippingForm.values.city}
                  className={`appearance-none block w-full px-3 py-2 border text-gray-700 bg-white ${
                    shippingForm.touched.city && shippingForm.errors.city
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {shippingForm.touched.city && shippingForm.errors.city && (
                  <p className="mt-1 text-sm text-red-600">{shippingForm.errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={shippingForm.handleChange}
                  onBlur={shippingForm.handleBlur}
                  value={shippingForm.values.phone}
                  className={`appearance-none block w-full text-gray-700 px-3 py-2 border bg-white ${
                    shippingForm.touched.phone && shippingForm.errors.phone
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {shippingForm.touched.phone && shippingForm.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{shippingForm.errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !shippingForm.isValid}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isLoading || !shippingForm.isValid 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Proceed to Payment
                    <i className="fa-brands fa-cc-visa ml-2 text-lg"></i>
                  </div>
                )}
              </button>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <i className="fa-brands fa-cc-visa text-2xl text-gray-600"></i>
              <i className="fa-brands fa-cc-mastercard text-2xl text-gray-600"></i>
              <i className="fa-brands fa-cc-amex text-2xl text-gray-600"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}