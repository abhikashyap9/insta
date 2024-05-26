import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import LinkExpired from './LinkExpired'
import Auth from '../services/AuthService/auth.service'


const ResetPassword = () => {
  const [state, setMyState] = useState(false)
  const [linkExpired,setLinkExpired]=useState(false)
  const [searchParams] = useSearchParams();
  let navigate=useNavigate();
  // console.log(searchParams.get('token'));
  const token=searchParams.get('token')
  console.log(token)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      confirmPassword: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      
    }),
    onSubmit: values => {
      let password=values.password
      console.log(password)
      let data={
        password:password
      }
      Auth.resetEmailPassword(token,data).then((res)=>{
        console.log(password)
          console.log(res)
          if(res.status===200){
            navigate('/LoginAuth')
          }
          else{
            setLinkExpired(true)
          }
      })
    },
  });
  return (
    <>
     {linkExpired && <LinkExpired/>}
    <div className="w-80 border-2 m-auto my-4 py-8 bg-white">

    <div className="m-2 px-8">
     <div className="logo w-44 h-11 mb-20 m-auto box-border">
       <img
         src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
         alt="logo"
         loading="lazy"
       />
     </div>
    <form onSubmit={formik.handleSubmit}>
    
      <div
              className={state === 1 ? 'slw' : 'slws'}
              onClick={() => setMyState(1)}
            >
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
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

<div
              className={state === 1 ? 'slw' : 'slws'}
              onClick={() => setMyState(1)}
            >
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        placeholder="Confirm your Password"
        className="outline-none bg-transparent w-full text-sm font-normal"


      />
      </div>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}

     <div className="text-center text-white">
      <button 
      type="submit" 
      className="bg-sky-500 px-4 py-1 rounded-sm w-full" >
     Submit
     </button>
      </div>
    </form>
    </div>
    </div>
    </>
  );
};

export default ResetPassword



