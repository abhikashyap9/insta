import React,{useState} from 'react'
// import Images from '../../../../backend'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import Feedoption from './Feedoption.js';
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom';

const Container=tw.div`main border rounded-lg my-2 bg-white`
const Header=tw.div`header flex justify-between p-4`
const HeaderItemsContainer=tw.div`flex items-center`
const ImagesContainer=tw.div`mr-2 cursor-pointer`
const LocationAndName=tw.div`cursor-pointer` 
const Location=tw.div`text-sm` 
const Options=tw.div`rightIndex`
const ImagesBox=tw.div`rightIndex`
const PostIcons=tw.div`px-1`
const IconsSpace=tw.div`flex justify-between ..`
const LikedByContainer=tw.div`m-2 flex items-center`
const LikedBy=tw.p`text-base font-semibold`
const NameText=tw.p`ml-2 text-sm`
const CommentsContainer=tw.div`m-2 flex items-center`
const CommentImages=tw.div`basis-1/12 border-4 border-rose-400 rounded-full ...  cursor-pointer m-2`
const CommentsInput=tw.div`basis-5/6`
const CommentButton=tw.div`basis-1/12 text-sky-700 text-md `
const CommentButtonPost=tw.button`text-sm disabled:opacity-100 ... disabled:opacity-25 ...`


function Posts(props) {
    
    const { user,name,location,userImages,caption,userName,active,handleClick,handleLikeClicks,userProfile,postProfile,getCommentValues,share,showComments } = props
    let userId=localStorage.getItem("userid")
    // console.log('showcomments',showComments)
  return (
    <div>
     <Container >
      <Header>
        <HeaderItemsContainer>
          <ImagesContainer onClick={userProfile}>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
             src={`localhost:3002/${postProfile}`} 
             alt="stories" 
             loading="lazy" />
          </ImagesContainer>
        <div> 
        <Link to={userId!=user?`profile/${user}`:`/profile`}> 
          <LocationAndName >
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
        <img src={`http://localhost:3002/${userImages}`} alt="UserFeed" loading="lazy" onClick={handleClick}/>
      </ImagesBox>

      <PostIcons>
        <IconsSpace>
         <Feedoption 
                    Icon={<FavoriteBorderIcon color={console.log('child',active==='active') || active==='active'?"primary":''} />}
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
      <LikedBy>LikedBy</LikedBy>
      <NameText>count</NameText>
      </LikedByContainer>
      <LikedByContainer>
      {caption && <LikedBy>{userName}</LikedBy>}
      <NameText>{caption}</NameText>
      </LikedByContainer>
     {/* {
      showComments && <div className='flex'>
      <ImagesContainer>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
             src={`localhost:3002/${postProfile}`} 
             alt="stories" 
             loading="lazy" />
          </ImagesContainer>
      <div className='m-2'>{showComments}</div>
      </div>
    } */}
      <CommentsContainer> 
        <CommentImages>
        <img 
            src="https://img.freepik.com/free-vector/attractive-man-s-face-dissolving-into-pen-lines-sketch-illustration_460848-14175.jpg?w=740&t=st=1667829996~exp=1667830596~hmac=7f5f30d9a5647fe8d04b30aad16f6b41cf7a744c6e7c18f2a73ad56ea1847bdf"
            alt="profile" 
            load="lazy" 
            className="inline-block rounded-full ring-2 ring-white"    
            />
        </CommentImages>
         <CommentsInput>
         <input 
         type="text" 
         placeholder="Add a comment..." 
         className="outline-none"
         onChange={getCommentValues}
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