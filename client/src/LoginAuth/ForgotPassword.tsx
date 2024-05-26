import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react'
import Auth from '../services/AuthService/auth.service'


const validate = (values) => {
    const errors = {}
  
    if (!values.email) {
      errors.email = 'Required'
    }
    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }
  
    // 
  
    return errors
  }
function ForgotPassword() {
  const [state, setMyState] = useState(false)

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validate,
        onSubmit: values => {
                 
              let email=values.email
              console.log(email)
              Auth.forgotPassword(email).then((res)=>{
                if(res.status===200){
                  console.log(res)
                }
              }).catch(err=>{
                console.log(err)
              })

        }})
  return (
    <div className="w-80 border-2 m-auto my-4 py-8 bg-white">
         <div className="m-2 px-8">
          <div className="logo w-44 h-11 mb-20 m-auto box-border">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
              alt="logo"
              loading="lazy"
            />
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-4">
            <div
              className={state === 1 ? 'slw' : 'slws'}
              onClick={() => setMyState(1)}
            >
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your Email"
                className="outline-none bg-transparent w-full text-sm font-normal"
              />
            </div>
      {formik.errors.email ? <div className='text-red-400'>This Field is {formik.errors.email}</div> : null}

            </form>
            <div className="text-center text-white">
              <button
                type="submit"
                className="bg-sky-500 px-4 py-1 rounded-sm w-full"
              >
                Submit
              </button>
            </div>
            </div>
           
    </div>
  )
}

export default ForgotPassword