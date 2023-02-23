import React,{useState} from 'react'
// import Images from '../../../../backend'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DummyPic from '../../image/dumyPic.svg.png'
import Feedoption from './Feedoption.js';
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom';

const Container=tw.div`main border rounded-lg my-2 bg-white`
const Header=tw.div`header flex justify-between p-4`
const HeaderItemsContainer=tw.div`flex items-center`
const ImagesContainer=tw.div`mr-2 cursor-pointer`
const LocationAndName=tw.div`cursor-pointer text-sm font-semibold text-zinc-800` 
const Location=tw.div`text-xs` 
const Options=tw.div`rightIndex`
const ImagesBox=tw.div`rightIndex`
const PostIcons=tw.div`px-1`
const IconsSpace=tw.div`flex justify-between ..`
const LikedByContainer=tw.div`m-2 flex items-center`
const LikedBy=tw.p`text-sm font-semibold`
const NameText=tw.p`ml-2 text-sm`
const CommentsContainer=tw.div`flex items-center`
const CommentImages=tw.div`border-4 border-rose-400 rounded-full ...  cursor-pointer m-2`
const CommentsInput=tw.div`basis-5/6`
const CommentButton=tw.div`basis-1/12 text-sky-700 text-md `
const CommentButtonPost=tw.button`text-sm disabled:opacity-100 ... disabled:opacity-25 ...`


function Posts(props) {
    
    const { user,name,location,userImages,caption,userName,active,handleClick,handleLikeClicks,userProfile,postProfile,getCommentValues,share,showComments,setCommentValue,currentUserProfileImage } = props
    let userId=localStorage.getItem("userid")
    
  return (
    <div>
     <Container >
      <Header>
        <HeaderItemsContainer>
          <ImagesContainer onClick={userProfile}>
            <img 
             src={`https://instaserver-26it.onrender.com/${postProfile}`} 
             alt="stories" 
             loading="lazy" 
             className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
             />
          </ImagesContainer>
        <div> 
        <Link to={userId!=user?`profile/${user}`:`/profile`}> 
          <LocationAndName>
            {name}
          </LocationAndName>
          </Link>
          <Location>
            {location}
          </Location>
          </div>
        </HeaderItemsContainer>

        <Options>
          <MoreHorizIcon/>
        </Options>
      </Header>

      <ImagesBox>
        <img src={`http://localhost:3001/${userImages}`} alt="UserFeed" loading="lazy" onClick={handleClick}/>
      </ImagesBox>

      <PostIcons>
        <IconsSpace>
         <Feedoption 
                    Icon={<FavoriteBorderIcon color={active==='active'?"primary":''} />}
                    likesCount="Likes"
                    modal={handleLikeClicks} 
                    />
         <Feedoption Icon={<ChatBubbleOutlineIcon />}
                     likesCount="Comment"
         />
         <Feedoption Icon={<IosShareIcon/>}
                     likesCount="Share"
         />
         <Feedoption Icon={<BookmarkBorderIcon/>}
          likesCount="Save"
         />
        </IconsSpace>
        
      </PostIcons>
      <LikedByContainer>
      <LikedBy>Liked by</LikedBy>
      <NameText>count</NameText>
      </LikedByContainer>
      <LikedByContainer>
      {caption && <LikedBy>{userName}</LikedBy>}
      <NameText>{caption}</NameText>
      </LikedByContainer>
     {
      showComments.length > 0 ? 
      <div>
     { showComments.map((comp)=>{
        return <> 
        <div className='flex items-center ml-2'>
        <ImagesContainer>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
             src={`https://instaserver-26it.onrender.com//${comp?.postedBy?.profilePicture[0]}`}
             alt="stories" 
             loading="lazy" />
          </ImagesContainer>
      <div className='m-2 text-sm font-semibold'>{comp?.postedBy?.userName}</div>
      <div className='my-2 mx-1 text-sm '>{comp?.comments}</div>
      </div>
      </>
      })
    }
      </div>:<></>
    }
      <CommentsContainer> 
        <CommentImages>
        <img 
            src={`${currentUserProfileImage ? `https://instaserver-26it.onrender.com/${currentUserProfileImage}`:DummyPic}`}
            alt="profile" 
            load="lazy" 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"    
            />
        </CommentImages>
         <CommentsInput>
         <input 
         type="text" 
         placeholder="Add a comment..." 
         className="outline-none"
         onChange={getCommentValues}
         value={setCommentValue}
         />
         </CommentsInput>
        <CommentButton>
        <CommentButtonPost onClick={share}>Post</CommentButtonPost>
        </CommentButton>
      </CommentsContainer>

    </Container>
    </div>
  )
}

export default Posts