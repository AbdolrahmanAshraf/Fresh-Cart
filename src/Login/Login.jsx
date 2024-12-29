import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../Context/UserContext';

export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function sendLogin(values) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string()
      .matches(passwordregex, 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character')
      .required('Password is required'),
  });

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: sendLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
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
          <div className="rounded-md shadow-sm space-y-4">
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
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  registerForm.errors.email && registerForm.touched.email
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your email"
              />
              {registerForm.errors.email && registerForm.touched.email && (
                <p className="mt-2 text-sm text-red-600">{registerForm.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  registerForm.errors.password && registerForm.touched.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                } bg-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your password"
              />
              {registerForm.errors.password && registerForm.touched.password && (
                <p className="mt-2 text-sm text-red-600">{registerForm.errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgetpassword" className="font-medium text-green-700 hover:text-green-900">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty) || isLoading}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading || !(registerForm.isValid && registerForm.dirty)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-700 hover:text-green-900">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
