import FollowCount from './FollowCount'
import { CiSettings } from "react-icons/ci";
import tw from 'tailwind-styled-components'
import { useMatchMedia } from '../Sidebar/useMediaMatch';

const EditAndProfileButton=tw.button`${props => props.primary ? "bg-sky-500 text-white px-4" : "bg-white-100 px-2" } border border-gray-200  py-0.5 rounded-sm`

function FollowInfoAndOther(props) {
   const { editOrFollow,profileFullName,profileName,editProfile,primary,followerCount,followingCount,message} = props
  const isDesktopResolution = useMatchMedia("(min-width:600px)", true);
   
   
   // openBox = () =>{ isOpen(true) }
   return (
      <>
         <div className='flex items-center'>
           { isDesktopResolution && <div className='mr-4'>
             <p className='text-xl font-normal'>{profileName}</p>
            </div>}
            <div className='mr-4 cursor-pointer'>
           {isDesktopResolution && <EditAndProfileButton primary={primary}  type='button' onClick={editProfile}>
            {editOrFollow}
            </EditAndProfileButton>
            }
            
            </div>
            
            {message}
            
           {isDesktopResolution && <div className='mr-4 cursor-pointer'><CiSettings/></div>}
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
         {!isDesktopResolution && <div className>
         <EditAndProfileButton primary={primary}  type='button' onClick={editProfile}>
            {editOrFollow}
            </EditAndProfileButton>
            </div>
            }
         <div>
            {/* <p>{profileFullName}</p> */}
        {isDesktopResolution &&<p>{profileFullName}</p>}

         </div>

        
      </>
   )

}

export default FollowInfoAndOther