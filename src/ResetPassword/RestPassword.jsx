import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function RestPassword() {
    let nav = useNavigate()
    let passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    
    let validationSchema = Yup.object({
        email: Yup.string().required("Email is Required").email("Enter Valid Email"),
        newPassword: Yup.string().matches(passwordregex, `Password must have:
            - Minimum 8 characters,
            - At least one uppercase letter,
            - At least one lowercase letter,
            - At least one digit,
            - At least one special character
        `).required("Password is Required")
    })
    
    let resetPasswordForm = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        validationSchema,
        onSubmit: resetPassword
    })

    async function resetPassword(val) {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
        console.log(data);
        if (data.token) {
            nav('/login')
        }
    }

    return (
        <div className='container mx-auto my-8 p-4 max-w-lg'>
            <form onSubmit={resetPasswordForm.handleSubmit}>
                {/* Email Input */}
                <div className='my-4'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        onChange={resetPasswordForm.handleChange}
                        onBlur={resetPasswordForm.handleBlur}
                        className='form-input mt-2 w-full p-3 border border-gray-300 rounded-lg'
                        type="email"
                        id='email'
                        name='email'
                    />
                    {resetPasswordForm.errors.email && resetPasswordForm.touched.email && (
                        <p className='text-red-500 text-sm mt-1'>{resetPasswordForm.errors.email}</p>
                    )}
                </div>

                {/* New Password Input */}
                <div className='my-4'>
                    <label htmlFor="newPassword" className='block text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        onChange={resetPasswordForm.handleChange}
                        onBlur={resetPasswordForm.handleBlur}
                        className='form-input mt-2 w-full p-3 border border-gray-300 rounded-lg'
                        type="password"
                        id='newPassword'
                        name='newPassword'
                    />
                    {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword && (
                        <p className='text-red-500 text-sm mt-1'>{resetPasswordForm.errors.newPassword}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className='mt-6'>
                    <button
                        disabled={!(resetPasswordForm.dirty && resetPasswordForm.isValid)}
                        className='btn bg-green-500 text-white p-3 w-full rounded-lg disabled:bg-gray-400'
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    )
}
