import React from 'react';
import HaveAccount from './HaveAccount';
import SignUpForm from './SignUpForm';

function Signup() {


  return (
    <>
      <div className='w-80 border-2 m-auto my-8 py-8 bg-white'>
        <div className="m-2 px-8">
          <div className="logo w-44 h-11 mb-10 m-auto box-border"><img src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" alt="logo" loading="lazy" /></div>
          <div className="text-gray-400 font-semibold text-center box-border"><p>Sign up to see photos and videos from your friends.</p></div>

          <div className="text-white bg-sky-500 text-center p-1 rounded-sm mt-4"><button>Login in With Facebook</button></div>
           <div>
            <div className="mt-2 flex items-center"><div className="w-20 h-px bg-slate-300"></div><div className='px-4'>OR</div><div className="w-20 h-px bg-slate-300"></div></div>
            <SignUpForm />
          </div>
          
        </div>

        {/* <div className='text-center text-white'><button type="submit" className='bg-sky-500 px-4 py-2'>Submit</button></div> */}
      </div>

      <HaveAccount name="Have Already An account"
                   signorlogin="Login"
                   link={"LoginAuth"}

      />

    </>
  )

}

export default Signup;