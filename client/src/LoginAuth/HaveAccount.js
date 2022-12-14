import React from 'react'
import { Link } from 'react-router-dom';

function HaveAccount(props) {
  
  const { name,signorlogin,link }=props;

  return (
    <div className='bg-white border mx-auto w-80 py-3 text-center'>
     <div className='my-2'><Link to={link}><p className='text-sm'>{name} <span className='text-sky-400 cursor-pointer'>{signorlogin}</span></p> </Link></div>
    </div>
  )

}

export default HaveAccount