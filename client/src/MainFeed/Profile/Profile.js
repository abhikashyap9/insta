import React, { useState, useRef, useEffect } from 'react'
import ProfilePicture from './ProfilePicture'
import ProfileHeader from './ProfileHeader'
import SavedPost from './SavedPost'
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import '../../App.css';
import EditProfile from './EditProfile'
import UserProfile from '../../services/userProfile.service'
import AddPosts from '../../services/addpost.service'

function Profile() {

  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState(true)
  const [user, setUser] = useState([])
  const [profileImage, setProfileImage] = useState([]);
  const [followers,setFollowers] =useState([])
  const [followings,setFollowings] = useState([])
  const [update,setUpdate]=useState([])

  const closeBox = () => { setIsOpen(false) }

  const handleClick = () => {
    inputRef.current.click();
  }

  const inputRef = useRef(null)

  let auth = localStorage.getItem("token")

  const onSelectFile = (event) => {
    
    const selectedFiles = event.target.files

    let imageFile = selectedFiles[0]
    
    if (selectedFiles.length > 0) {
      setIsOpen(false)
      const formData = new FormData()
      formData.append("image", imageFile)
      AddPosts.addProfileImage(formData, auth).then((res) => {
        if(res.status===201){
          console.log('OnSuceesss',res)
          setUpdate(Math.random()*5)

        }
        else{
          console.log('OnFail',res)
        }
      })
    }
  }
  useEffect(() => {

    UserProfile.userGet(auth).then((res) => {
      console.log(res)
      const data=res.data
      const{ following, followers }=data
      const profilePicture=data.profilePicture;
      const setProfile=profilePicture[0];
      console.log(setProfile)
      let followingLength=following.length;
      let followerLength=followers.length;
      setFollowers(followerLength)
      setFollowings(followingLength)  
      setUser(data)
      setProfileImage(setProfile)
    })

  }, [update])
  

  return (
    <>

      {isOpen && (
        <>
          <ReactDialogBox
            closeBox={closeBox}
            modalWidth='30%'
            headerBackgroundColor='white'
            headerTextColor='black'
            headerHeight='65'
            closeButtonColor='white'
            bodyBackgroundColor='white'
            bodyTextColor='black'
            bodyHeight='200px'
            headerText='Change Profile Picture'
          >
            <div className=''>
              <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={onSelectFile}
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
              <div className='border-b border-t border-gray-500 py-4 cursor-pointer' onClick={handleClick}><h1>Upload Photo</h1></div>
              <div className='py-4 text-red-400 cursor-pointer' onClick={() => setIsOpen(false)}><h1>Cancel</h1></div>
            </div>
          </ReactDialogBox>
        </>
      )}
      {profile &&
        <div className='border h-screen bg-white'>

          
          <div className='flex py-2 mt-2'>

            <ProfilePicture
              profileImage={profileImage}
              openModal={() => setIsOpen(true)} />

            <div className=''>
              <ProfileHeader editOrFollow={'EditProfile'}
                editProfile={() => setProfile(false)}
                profileName={user.userName}
                profileFullName={user.fullName}
                followingCount={followings}
                followerCount={followers}
              />
            </div>
          </div>

          <div className=''>

          </div>
          {/* .............Post Section................ */}
          <div className='border border-t-gray-50 mt-8 pt-2'>
            <SavedPost />
          </div>

        </div>

      }
      {
        !profile && <EditProfile close={() => setProfile(true)} />
      }
    </>
  )
}

export default Profile