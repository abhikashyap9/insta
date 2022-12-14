import React, { useEffect, useState } from 'react';
import HeaderIndex from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Footer from './Footer/Footer';
import Explore from './Explore/Explore.js';
import Message from './MessagesApp/Message.js';
import Notification from './Notification/Notification';
import AddImages from './Add Images/AddImages';
import Profile from "./Profile/Profile.js";
import '../App.css';
import Sidebar from './Sidebar/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import tw from 'tailwind-styled-components'
import Navbar from './Navbar';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useMatchMedia } from './Sidebar/useMediaMatch';
import EditProfile from './Profile/EditProfile';
import { Outlet, Route, Routes } from 'react-router-dom';
import UserProfile from '../services/userProfile.service';

function MainFeedIndex() {

  const isDesktopResolution = useMatchMedia("(min-width:1024px)", true);
  
  const [profileImage,setProfileImage] = useState([])
  
  let   auth=localStorage.getItem("token")

 useEffect(() => {
  UserProfile.userImage(auth).then((res)=>{
    setProfileImage(res.data)
  })
 }, [])
 
  return (
    <>
      <Navbar
        instaLogo={<InstagramIcon style={{ fontSize: 24 }} />}
        searchBar={<div className='sm:py-1 md:py-1 lg:py-0 rounded-md border border-gray-200 bg-gray-100'><input type="text" placeholder='Search' className='outline-none border-none w-full bg-transparent text-sm pl-2' /></div>}
        profile='profile'
        setProfile={`profile`}
        profileImage={profileImage}
      />

      <div className='flex lg:justify-between md:justify-center sm:justify-center xs:justify-center'>

        {isDesktopResolution &&
          <div className="lg:basis-1/5">
            <Sidebar/>
          </div>
        }

        {
          !isDesktopResolution && <div>
            <Sidebar/> </div>
        }

        <div className="sm:basis-1/2 lg:basis-2/5 md:basis-2/5 xs:basis-full top w-s">
          <Outlet/>
        </div>
          <div className="lg:basis-1/5 md:basis-0 xs:basis-0 sm:basis-0">
            {/* {isDesktopResolution && <Footer />} */}
            {/* j */}
          </div>
        </div>
      </>
      )
}

      export default MainFeedIndex;