import React, { useState,useEffect } from 'react'
import ProfilePicture from './ProfilePicture';
import ProfileHeader from './ProfileHeader'
import SavedPost from './SavedPost'
import { useParams } from 'react-router-dom';
// import auth from '../../LoginAuth/auth';
import tw from 'tailwind-styled-components'
import UserProfile from '../../services/userProfile.service';
import { Link } from 'react-router-dom';
import Messages from '../../services/message.service';
import ProfileImagesModal from './ProfileImagesModal'


const MessageButton=tw.button`${props => props.primary ? "bg-sky-500 text-white px-4" : "bg-white-100 px-2" } border border-gray-200  py-0.5 rounded-sm`
function OtherProfile() {
  const {id} = useParams()
  console.log(id)
  const [ otherUser,setOtherUser ] = useState([])
  const [followDone,setFollowDone] = useState(0)
  const [userData, setUserData] = useState([])
  const [isOpenProfile, setIsOpenProfile] = useState(false)



  let auth=localStorage.getItem("token")
  let userId=localStorage.getItem("userid")

  useEffect(() => {
    UserProfile.getUserById(id).then((res)=>{
      console.log(res)
      setOtherUser(res.data)
    })
    UserProfile.otherUsersPosts(id).then((res) => {
      console.log(res)
      setUserData(res.data)
    })
  }, [followDone])
  
  const follow=()=>{
    UserProfile.userFollow(id,auth).then((res)=>{
      setFollowDone(1)
    })}

  const unfollow=()=>{   
    UserProfile.userUnfollow(id,auth).then((res)=>{
      setFollowDone(2)
    })
  }

  let otherUsers=otherUser?.followers?.includes(userId)
  let buttonData   = otherUsers  ? 'Unfollow':'Follow'
  let workFunction = otherUsers  ? unfollow : follow
  console.log(auth)
  
  const createRoom=(userId)=>{
    Messages.createRoom(userId,auth).then((res)=>{
      console.log(res)
    })
    
  }
  const openProfileModal = () => {
    setIsOpenProfile(true)
  }

  return (
    <>
    <div className='border h-screen bg-white'>      
     <div className='flex py-2 mt-2'>
        <ProfilePicture />
            <div className=''>
              <ProfileHeader editOrFollow={buttonData}
                primary={'primary'}
                profileName={otherUser.userName}
                profileFullName={otherUser.fullName}
                editProfile={workFunction}
                followerCount={otherUser?.followers?.length}
                followingCount={otherUser?.following?.length}
                message={<Link to={`/message/${otherUser.id}`} > <MessageButton onClick={()=>createRoom(otherUser.id)}>Message</MessageButton></Link>}
              />
            </div>   
      </div>
      {isOpenProfile && (
        <ProfileImagesModal
          userData={userData}
          closeProfileModal={() => setIsOpenProfile(false)}
        />
      )}
      <div className='border border-t-gray-50 mt-8 pt-2'>
            <SavedPost userData={userData}
              openProfileModal={openProfileModal}
            
            />

      </div>
    </div>    
    </>
  )
}

export default OtherProfile;