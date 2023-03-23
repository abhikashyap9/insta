import React from 'react'
import './Profile.css'
import DummyPic from '../../image/dumyPic.svg.png'
import { useMatchMedia } from '../Sidebar/useMediaMatch';

function ProfilePicture(props) {

  const {openModal,profileImage,profileFullName}=props; 
  const isDesktopResolution = useMatchMedia("(min-width:600px)", true);



  return (
    <>
        <div className='cursor-pointer xs:pl-4' onClick={openModal}>
       
        <img
            className="circle_imageProfile h-12 w-12 "
            src={`${profileImage ? `http://localhost:3001/${profileImage}`:DummyPic}`}
            alt='image' />
        {!isDesktopResolution &&<p>{profileFullName}</p>}
        </div>
    </>
  )

}

export default ProfilePicture