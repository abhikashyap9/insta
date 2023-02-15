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
import { Outlet, useLocation } from 'react-router-dom';
import UserProfile from '../services/userProfile.service';
import { useSelector, useDispatch } from 'react-redux'
import {actions} from '../features/counter/AddDifferentSizes.js';
import { QrCodeScannerOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
function MainFeedIndex() {

  const isDesktopResolution = useMatchMedia("(min-width:1024px)", true);
  
  const [profileImage,setProfileImage] = useState([])
  const [size,setSize]=useState({sidebar:'',mainScreen:''})
  const [change,setChange]=useState(0)
  
  let   auth=localStorage.getItem("token")

 useEffect(() => {
  UserProfile.userImage(auth).then((res)=>{
    setProfileImage(res.data)
  })
 }, [])
 


const location = useLocation()
const navigate = useNavigate();
useEffect(()=>{
  // console.log(location);
     if(location.pathname === '/'){
       setSize({...size,
        sidebar:'lg:basis-1/4',
        mainScreen:'sm:basis-1/2 lg:basis-9/12 md:basis-2/5 xs:basis-full top w-s'})
        document.body.style.overflowY = "";
       
     }
     else if(location.pathname === '/explore'){
      setSize(0) 
     }
     else if(location.pathname === '/notification'){
      setSize(0) 
     }
     else if(location.pathname === '/addImages'){
      setSize(0) 
     }
     else if(location.pathname.slice(0,8) === '/message'){
     console.log('Auth',auth)
      if(!auth){
        navigate("/Signup")
        console.log(location.pathname)
      }
      setSize({...size,
        sidebar:'lg:basis-1/5',
        mainScreen:'sm:basis-1/2 lg:basis-4/5	 md:basis-2/5 xs:basis-full top w-s'})
        document.body.style.overflowY = "hidden";
     }
},[location.pathname])
 
 
console.log(size.sidebar,size.mainScreen)


  return (
    <>
     
      <Navbar
        instaLogo={<InstagramIcon style={{ fontSize: 24 }} />}
        searchBar={<div className='sm:py-1 md:py-1 lg:py-0 rounded-md border border-gray-200 bg-gray-100'>
        <input type="text" 
        placeholder='Search' 
        className='outline-none border-none w-full bg-transparent text-sm pl-2' />
        </div>}
        profile='profile'
        setProfile={`profile`}
        profileImage={profileImage}
      />
  
      <div className='flex lg:justify-between md:justify-center sm:justify-center xs:justify-center'>

        {isDesktopResolution &&
          <div className={size.sidebar}>
            <Sidebar/>
          </div>
        }

        {
          !isDesktopResolution && <div className={size.sidebar}>
            <Sidebar/> </div>
        }
        {/* sm:basis-1/2 lg:basis-2/5 md:basis-2/5 xs:basis-full top w-s */}
        <div className={size.mainScreen}>
          <Outlet/>
        </div>
         
        </div>
      </>
      )
}

      export default MainFeedIndex;