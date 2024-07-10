import { useState } from 'react'
import { useFormik } from 'formik'
import '../App.css'
import * as Yup from 'yup'
import { useCreateUser } from './api'
import { CreateUser } from './interfaces'
import { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/dark.css'
import Loader from '../ui/ui-loader'
toastConfig({ theme: 'dark' })

const SignupForm = () => {
    const { mutate, isLoading, isSuccess } = useCreateUser()

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            userName: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required')
                .max(40, 'Max 40 Characters'),
            fullName: Yup.string()
                .required(`Fullname required`)
                .max(15, 'Max 15 Characters'),
            userName: Yup.string()
                .required(`UserName required`)
                .max(15, 'Max 15 Characters'),
            password: Yup.string()
                .required(`Password Required`)
                .min(8, 'Min 8 Characters'),
        }),
        onSubmit: (values: CreateUser) => {
            mutate(values)
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className={`relative my-4`}>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your Email"
                    className="outline-none bg-transparent w-full text-sm font-normal p-1 border"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-400 text-xs absolute top-7">
                        {formik.errors.email}
                    </div>
                ) : null}
            </div>

            <div className={`relative my-4`}>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    placeholder="Enter your Full Name"
                    className="outline-none bg-transparent w-full text-sm font-normal p-1 border"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-400 text-xs absolute top-7">
                        {formik.errors.fullName}
                    </div>
                ) : null}
            </div>
            <div className={`relative my-4`}>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    placeholder="Enter Your User Name"
                    className="outline-none bg-transparent w-full text-sm font-normal p-1 border"
                />
                {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-red-400 text-xs absolute top-7">
                        {formik.errors.userName}
                    </div>
                ) : null}
            </div>

            <div className={`relative my-4`}>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Password"
                    className="outline-none bg-transparent w-full text-sm font-normal p-1 border"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-400 text-xs absolute top-7">
                        {formik.errors.password}
                    </div>
                ) : null}
            </div>

            <div className="text-gray-400 text-xs text-center mt-7">
                <div className="mb-3">
                    People who use our service may have uploaded your contact
                    information to Instagram. Learn More
                </div>
                <div className="mb-3">
                    By signing up, you agree to our Terms , Privacy Policy and
                    Cookies Policy .
                </div>
            </div>
            <div className="text-center text-white">
                <button
                    type="submit"
                    className="bg-sky-500 px-4 py-1 rounded-sm w-full"
                    disabled={isLoading}
                >
                    Signup
                </button>
            </div>
        </form>
    )
}

export default SignupForm
                    {/* {isLoading ? <Loader /> : 'Signup'} */}
