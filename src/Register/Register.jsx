import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function sendRegister(values) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        registerForm.resetForm();
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name can't be more than 10 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordregex,
        'Password requirements:\n• Minimum 8 characters\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character'
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required("Please confirm your password"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: sendRegister,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </Link>
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
        <form className="mt-8 space-y-6" onSubmit={registerForm.handleSubmit}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.name}
                className={`mt-1 appearance-none block w-full px-3 text-gray-700 py-2 border ${
                  registerForm.errors.name && registerForm.touched.name
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                placeholder="Enter your full name"
              />
              {registerForm.errors.name && registerForm.touched.name && (
                <p className="mt-2 text-sm text-red-600">{registerForm.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.email}
                className={`mt-1 appearance-none block w-full text-gray-700 px-3 py-2 border ${
                  registerForm.errors.email && registerForm.touched.email
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                placeholder="Enter your email address"
              />
              {registerForm.errors.email && registerForm.touched.email && (
                <p className="mt-2 text-sm text-red-600">{registerForm.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.password}
                className={`mt-1 appearance-none block text-gray-700 w-full px-3 py-2 border ${
                  registerForm.errors.password && registerForm.touched.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                placeholder="Create a password"
              />
              {registerForm.errors.password && registerForm.touched.password && (
                <p className="mt-2 text-sm text-red-600 whitespace-pre-line">{registerForm.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="rePassword"
                name="rePassword"
                type="password"
                autoComplete="new-password"
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.rePassword}
                className={`mt-1 appearance-none block text-gray-700 w-full px-3 py-2 border ${
                  registerForm.errors.rePassword && registerForm.touched.rePassword
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm`}
                placeholder="Confirm your password"
              />
              {registerForm.errors.rePassword && registerForm.touched.rePassword && (
                <p className="mt-2 text-sm text-red-600">{registerForm.errors.rePassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty) || isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading || !(registerForm.isValid && registerForm.dirty)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}