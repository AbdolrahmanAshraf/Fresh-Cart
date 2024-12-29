import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgetPassword() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  async function forgetPassword(values) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
      if (data.statusMsg === 'success') {
        setShowResetForm(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
  });

  const resetValidationSchema = Yup.object({
    resetCode: Yup.string().required('Reset Code is required').matches(/^[0-9]+$/, 'Must be only numbers'),
  });

  const forgetForm = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: forgetPassword,
  });

  const resetForm = useFormik({
    initialValues: { resetCode: '' },
    validationSchema: resetValidationSchema,
    onSubmit: sendResetCode,
  });

  async function sendResetCode(values) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      if (data.status === 'Success') {
        navigate('/resetpassword');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showResetForm ? 'Enter Reset Code' : 'Forgot Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showResetForm
              ? 'Please enter the reset code sent to your email'
              : 'Please enter your email to receive a reset code'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-red-400"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={showResetForm ? resetForm.handleSubmit : forgetForm.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!showResetForm ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onBlur={forgetForm.handleBlur}
                    onChange={forgetForm.handleChange}
                    className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                      forgetForm.errors.email && forgetForm.touched.email
                        ? 'border-red-300'
                        : 'border-gray-300'
                    } bg-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter your email"
                  />
                  {forgetForm.errors.email && forgetForm.touched.email && (
                    <p className="mt-2 text-sm text-red-600">{forgetForm.errors.email}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
                    Reset Code
                  </label>
                  <input
                    id="resetCode"
                    name="resetCode"
                    type="text"
                    onBlur={resetForm.handleBlur}
                    onChange={resetForm.handleChange}
                    className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                      resetForm.errors.resetCode && resetForm.touched.resetCode
                        ? 'border-red-300'
                        : 'border-gray-300'
                    } bg-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                    placeholder="Enter your reset code"
                  />
                  {resetForm.errors.resetCode && resetForm.touched.resetCode && (
                    <p className="mt-2 text-sm text-red-600">{resetForm.errors.resetCode}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!(showResetForm ? resetForm.isValid && resetForm.dirty : forgetForm.isValid && forgetForm.dirty) || isLoading}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading || !(showResetForm ? resetForm.isValid && resetForm.dirty : forgetForm.isValid && forgetForm.dirty)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                showResetForm ? 'Verify Code' : 'Send Reset Code'
              )}
            </button>
          </div>

          {!showResetForm && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Remembered your password?{' '}
                <Link to="/login" className="font-medium text-green-700 hover:text-green-900">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
