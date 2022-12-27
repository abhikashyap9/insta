import React from 'react'
import FollowCount from './FollowCount'
import SettingsIcon from '@mui/icons-material/Settings';
import tw from 'tailwind-styled-components'

const EditAndProfileButton=tw.button`${props => props.primary ? "bg-sky-500 text-white px-4" : "bg-white-100 px-2" } border border-gray-200  py-0.5 rounded-sm`

function FollowInfoAndOther(props) {
   const { editOrFollow,profileFullName,profileName,editProfile,primary,followerCount,followingCount,message} = props
   
   
   // openBox = () =>{ isOpen(true) }
   return (
      <>
         <div className='flex items-center'>
            <div className='mr-4'>
             <p className='text-4xl font-thin'>{profileName}</p>
            </div>
            <div className='mr-4 cursor-pointer'>
            <EditAndProfileButton primary={primary}  type='button' onClick={editProfile}>
            {editOrFollow}
            </EditAndProfileButton>
            
            </div>
            
            {message}
            
            <div className='mr-4 cursor-pointer'><SettingsIcon/></div>
         </div>
             
         <div className='flex py-4'>
            <FollowCount
               count='8'
               info='info'
            />

            <FollowCount
               count={followerCount}
               info='Followers'
            />

            <FollowCount
               count={followingCount}
               info='following'
            />
         </div>
         <div>
            <p>{profileFullName}</p>
         </div>

        
      </>
   )

}

export default FollowInfoAndOther