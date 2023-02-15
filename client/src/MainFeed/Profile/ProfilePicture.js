import React from 'react'
import DummyPic from '../../image/dumyPic.svg.png'

function ProfilePicture(props) {

  const {openModal,profileImage}=props;  


  return (
    <>
        <div className='px-12' onClick={openModal}>
        <img
            className="inline-block h-36 w-36 rounded-full ring-2 ring-white object-cover"
            src={`${profileImage ? `https://instaserver-26it.onrender.com/${profileImage}`:DummyPic}`}
            alt='image' />
            
        </div>
    </>
  )

}

export default ProfilePicture