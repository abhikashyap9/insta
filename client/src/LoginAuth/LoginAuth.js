// import React from 'react';
import { useFormik } from 'formik';
import { useState} from 'react';
import HaveAccount from './HaveAccount';
import '../App.css';
import Auth from '../services/AuthService/auth.service';
import { useNavigate } from "react-router-dom";

const validate = values => {
  
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } 
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address';
  // }

  if(!values.password){
    errors.userName = 'Required';
  }else if(values.password.length >20){
   errors.password="Please Enter Valid Password";
  }

  return errors;
};

const SignupForm = () => {
  const [state,setMyState]=useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validate,
    onSubmit: values => { 
      console.log(values)
      Auth.login(values).then((res)=>{
        
         if(res.status===200){
          let { data }=res
          const { token,username,id } =data
          localStorage.setItem('token',token)
          localStorage.setItem('username',username)
          localStorage.setItem('userid',id)

          navigate('/')
         }

      })

      alert(JSON.stringify(values, null, 2))
    },
  });
  return (
    <>
    <div className='w-80 border-2 m-auto my-4 py-8 bg-white'>
    <div className="m-2 px-8">
    <div className="logo w-44 h-11 mb-20 m-auto box-border"><img src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" alt="logo" loading="lazy"/></div>
    
    <form onSubmit={formik.handleSubmit} className="mt-4">
      <div className={ state===1 ? 'slw' : 'slws' } onClick={()=>setMyState(1)} >
       <input
        id="email"
        name="email"
        // type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder="Enter your Email"
        className="outline-none bg-transparent w-full text-sm font-normal"
      />
      </div>
     
    <div className={ state===2 ? 'slw' : 'slws' } onClick={()=>setMyState(2)}>   
      <input 
             id="password"
             name="password" 
             type="password"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.password}
             placeholder="Enter your Password"
             className="outline-none bg-transparent w-full text-sm font-normal"
      />
    </div>
    
    <div className='text-center text-white'><button type="submit" className='bg-sky-500 px-4 py-1 rounded-sm w-full'>Submit</button></div>
    </form>
    <div className="mt-3 flex items-center"><div className="w-20 h-px bg-slate-300"></div><div className='px-4'>OR</div><div className="w-20 h-px bg-slate-300"></div></div>
    <div className="mt-4 text-center text-blue-800">Login With Facebook</div>
    <div className="mt-4 text-center text-xs">Forgot Password?</div>
    </div>
    
    </div>
    <HaveAccount
      name="Don't Have an Account?"
      signorlogin="Signup"
      link={"/"}
    />
    </>
  );
};

export default SignupForm;