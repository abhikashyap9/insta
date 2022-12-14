import React from 'react'

function ProfilePicture(props) {

  const {openModal,profileImage}=props;    

  return (
    <>
        <div className='px-12' onClick={openModal}>
        <img
            className="inline-block h-36 w-36 rounded-full ring-2 ring-white object-cover"
            src={`http://localhost:3002/${profileImage}`}
            alt='image' />
            
        </div>
    </>
  )

}

export default ProfilePicture