import React, { useEffect, useState, useDeferredValue } from 'react'
import HeaderIndex from './Sidebar/Sidebar.js'
import { FaInstagram } from "react-icons/fa";

import Feed from './Feed/Feed.js'
import Footer from './Footer/Footer.js'
import Explore from './Explore/Explore.js'
import Message from './MessagesApp/Message.js'
import Notification from './Notification/Notification.js'
import AddImages from './Add Images/AddImages.js'
import Profile from './Profile/Profile.js'
import '../App.css'
import Sidebar from './Sidebar/Sidebar.js'
import SearchIcon from '@mui/icons-material/Search'
import tw from 'tailwind-styled-components'
import Navbar from './Navbar.js'
import { useMatchMedia } from './Sidebar/useMediaMatch.js'
import EditProfile from './Profile/EditProfile.js'
import { Link, Outlet, useLocation } from 'react-router-dom'
import UserProfile from '../services/userProfile.service.js'
import { QrCodeScannerOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
// import UserProfile from '../services/userProfile.service';
import { setUserData } from '../features/LoginCredentials/userSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import DummyPic from '../../src/image/dumyPic.svg.png'

function MainFeedIndex() {
  const isDesktopResolution = useMatchMedia('(min-width:1024px)', true)

  const [profileImage, setProfileImage] = useState([])
  const [size, setSize] = useState({ sidebar: '', mainScreen: '' })
  const [change, setChange] = useState(0)
  const [value, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [searchBox, setSearchBox] = useState(false)
  const defferedInput = useDeferredValue(value)
  let userId = localStorage.getItem('userid')

  let auth = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    UserProfile.userImage(auth).then((res) => {
      setProfileImage(res.data)
    })
  }, [])

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // console.log(location);
    if (location.pathname === '/') {
      setSize({
        ...size,
        sidebar: 'sidebar_feed',
        mainScreen:
          'sm:basis-1/2 lg:basis-9/12 md:basis-2/5 xs:basis-full top w-s',
      })
      document.body.style.overflowY = ''
    } else if (location.pathname === '/explore') {
      setSize({
        ...size,
        sidebar: 'lg:basis-1/4',
        mainScreen:
          'sm:basis-1/2 lg:basis-1/2 md:basis-2/5 xs:basis-full top w-s',
      })
      document.body.style.overflowY = ''
    } else if (location.pathname === '/notification') {
      setSize(0)
    } else if (location.pathname === '/addimages') {
      setSize({
        ...size,
        sidebar: 'add_images',
        mainScreen:
          'sm:basis-1/2 lg:basis-2/5 md:basis-2/5 xs:basis-full top w-s',
      })
    } else if (location.pathname.slice(0, 8) === '/message') {
      if (!auth) {
        navigate('/auth/signup')
        console.log(location.pathname)
      }
      setSize({
        ...size,
        sidebar: 'lg:basis-1/5 message_feed',
        mainScreen:
          'sm:basis-full lg:basis-4/5 md:basis-4/6 xs:basis-full top w-s',
      })
      document.body.style.overflowY = 'hidden'
    } else if (location.pathname.slice(0, 8) === '/profile') {
      setSize({
        ...size,
        sidebar: 'lg:basis-1/5 sidebar_profile',
        mainScreen:
          'sm:basis-1/2 lg:basis-3/5	 md:basis-2/5 xs:basis-full top w-s',
      })
      document.body.style.overflowY = ''
    } else if (location.pathname === '/profile') {
      setSize({
        ...size,
        sidebar: 'lg:basis-1/5 sidebar_profile',
        mainScreen:
          'sm:basis-1/2 lg:basis-basis-3/5	md:basis-2/5 xs:basis-full top w-s',
      })
      document.body.style.overflowY = ''
    }
  }, [location.pathname])

  console.log(location.pathname)

  useEffect(() => {
    UserProfile.userGet(auth).then((res) => {
      let { data } = res
      const { userName, profilePicture, isStorie } = data

      let setProfilePicture =
        profilePicture.length > 0 ? profilePicture[0] : DummyPic

      let userLoginData = {
        userName: userName,
        userProfilePicture: setProfilePicture,
        isStorie: isStorie ? isStorie : false,
      }
      dispatch(setUserData(userLoginData))
    })
  }, [])

  const search = (e) => {
    let input = e.target.value
    if (input.length > 0) {
      setSearchBox(true)
    }
    setSearchValue(input)
    if (defferedInput) {
      UserProfile.searchUser(defferedInput)
        .then((res) => {
          return res
        })
        .then((res) => {
          if (res.status === 200) {
            let data = res.data
            setSearchResults(data)
          }
        })
    }
    // showData()
  }
  return (
    <>
      <Navbar
        instaLogo={<FaInstagram style={{ fontSize: 24 }} />}
        searchBar={
          <div className="sm:py-1 md:py-1 lg:py-0 rounded-md border border-gray-200 bg-gray-100 ">
            <input
              type="text"
              placeholder="Search"
              className="outline-none border-none w-full bg-transparent text-sm pl-2"
              onChange={search}
            />
          </div>
        }
        profile="profile"
        setProfile={`profile`}
        profileImage={profileImage}
        newDiv={
          searchBox ? (
            <div className="relative">
              <div className="h-auto w-2/4 bg-white text-black absolute top-0.5 z-10 rounded-md">
                {value.length === 0 ? (
                  <div
                    className="text-right pr-2 cursor-pointer"
                    onClick={() => setSearchBox(false)}
                  >
                    <p>x</p>
                  </div>
                ) : (
                  <></>
                )}
                {Array.isArray(searchResults) &&
                  searchResults.map((users, index) => {
                    return (
                      <>
                        <Link
                          to={
                            userId !== users.id
                              ? `../profile/${users.id}`
                              : `/profile`
                          }
                        >
                          <div
                            className=" border-gray-400 py-2 cursor-pointer"
                            onClick={() => setSearchBox(false)}
                            key={index}
                          >
                            <div className="flex items-center py-0.5 hover:bg-slate-100 rounded">
                              <div className="px-1">
                                <div
                                // className="flex"
                                // onClick={()=>showPhoto(index)}
                                >
                                  <img
                                    className="h-12 w-12 object-cover rounded-full"
                                    src={`${
                                      users.profilePicture.length > 0
                                        ? `http://localhost:3001/${users.profilePicture[0]}`
                                        : DummyPic
                                    }`}
                                    alt="stores"
                                  />
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium">
                                  {users.userName}
                                </p>
                                <p className="text-sm text-slate-400">
                                  {users.fullName}{' '}
                                  <span className="font-bold px-0.5">.</span>
                                  <span>
                                    {users.followers.length} followers
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {/* <p>{users.userName}</p> */}
                      </>
                    )
                  })}
              </div>
            </div>
          ) : (
            <></>
          )
        }
      />
      {}

      <div className="flex lg:justify-start md:justify-start sm:justify-start xs:justify-start">
        {isDesktopResolution && (
          <div className={size.sidebar}>
            <Sidebar />
          </div>
        )}

        {!isDesktopResolution && (
          <div className={size.sidebar}>
            <Sidebar />{' '}
          </div>
        )}
        {/* sm:basis-1/2 lg:basis-2/5 md:basis-2/5 xs:basis-full top w-s */}
        <div className={size.mainScreen}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainFeedIndex
