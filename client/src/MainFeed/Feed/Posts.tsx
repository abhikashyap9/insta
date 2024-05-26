import { CiChat1 } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import DummyPic from '../../image/dumyPic.svg.png'
import Feedoption from './Feedoption.js'
import tw from 'tailwind-styled-components'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";

const Container = tw.div`main lg:border rounded-lg my-2 bg-white`
const Header = tw.div`header flex justify-between p-4`
const HeaderItemsContainer = tw.div`flex items-center`
const ImagesContainer = tw.div`mr-2 cursor-pointer`
const LocationAndName = tw.div`cursor-pointer text-sm font-semibold text-zinc-800`
const Location = tw.div`text-xs`
const Options = tw.div`rightIndex`
const ImagesBox = tw.div`rightIndex`
const PostIcons = tw.div`px-1`
const IconsSpace = tw.div`flex justify-between ..`
const LikedByContainer = tw.div`m-2 flex items-center cursor-pointer`
const LikedBy = tw.p`text-sm `
const NameText = tw.p`ml-2 text-sm font-semibold`
const CommentsContainer = tw.div`flex items-center`
const CommentImages = tw.div`border-4 border-rose-400 rounded-full ...  cursor-pointer m-2`
const CommentsInput = tw.div`basis-5/6`
const CommentButton = tw.div`basis-1/12 text-sky-700 text-md `
const CommentButtonPost = tw.button`text-sm disabled:opacity-100 ... disabled:opacity-25 ...`

function Posts(props) {
  const {
    keys,
    user,
    name,
    location,
    userImages,
    caption,
    userName,
    active,
    handleClick,
    handleLikeClicks,
    userProfile,
    postProfile,
    getCommentValues,
    share,
    showComments,
    setCommentValue,
    currentUserProfileImage,
    count,
    openLikesModal,
    openCommentsModal,
    commentsModal,
  } = props

  let countFirstName = count[0]?.userName
  let countS = count.length - 1 > 1 ? 's' : ''
  let others = count.length > 1 ? `and ${count.length - 1} other${countS}` : ''
  console.log(postProfile)
  let userId = localStorage.getItem('userid')
  console.log(currentUserProfileImage)

  return (
    <div key={keys}>
      <Container>
        <Header>
          <HeaderItemsContainer>
            <ImagesContainer onClick={userProfile}>
              <img
                src={`${
                  postProfile
                    ? `http://localhost:3001/${postProfile}`
                    : DummyPic
                }`}
                // src={`https://instaserver-26it.onrender.com/${postProfile}`}
                alt="stories"
                loading="lazy"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              />
            </ImagesContainer>
            <div>
              <Link to={userId !== user ? `profile/${user}` : `/profile`}>
                <LocationAndName>{name}</LocationAndName>
              </Link>
              <Location>{location}</Location>
            </div>
          </HeaderItemsContainer>

          <Options>
            <IoEllipsisHorizontalCircle />
          </Options>
        </Header>

        <ImagesBox>
          <img
            src={`http://localhost:3001/${userImages}`}
            alt="UserFeed"
            loading="lazy"
            onClick={handleClick}
          />
        </ImagesBox>

        <PostIcons>
          <IconsSpace>
            <Feedoption
              Icon={
                active === 'active' ? (
                  <CiHeart />

                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )
              }
              likesCount="Likes"
              modal={handleLikeClicks}
              rightBorder={2}
            />
            <Feedoption
              modal={openCommentsModal}
              Icon={<CiChat1 fontSize="small" />}
              likesCount="Comment"
              rightBorder={2}
            />
            <Feedoption
              Icon={<FaShare fontSize="small" />}
              likesCount="Share"
              rightBorder={2}
            />
            <Feedoption
              rightBorder={0}
              Icon={<CiBookmark fontSize="small" />}
              likesCount="Save"
            />
          </IconsSpace>
        </PostIcons>
        <LikedByContainer onClick={openLikesModal}>
          {count.length > 0 ? (
            <>
              <LikedBy>Liked by</LikedBy>
              <NameText>
                {countFirstName} {others}
              </NameText>
            </>
          ) : (
            <></>
          )}
          {/* {<><LikedBy>Liked by</LikedBy><NameText>{countFirstName}</NameText></>:<></>} */}
        </LikedByContainer>
        <LikedByContainer>
          {caption && <LikedBy>{userName}</LikedBy>}
          <NameText>{caption}</NameText>
        </LikedByContainer>
        {showComments.length > 0 ? (
          <div className="ml-2 cursor-pointer">
            {/* { showComments.map((comp)=>{
        return <> 
        <div className='flex items-center ml-2'>
        <ImagesContainer>
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={`${comp?.postedBy?.profilePicture.length>0 ? `http://localhost:3001/${comp?.postedBy?.profilePicture[0]}`:DummyPic}`}
            
             alt="stories" 
             loading="lazy" />
          </ImagesContainer>
      <div className='m-2 text-sm font-semibold'>{comp?.postedBy?.userName}</div>
      <div className='my-2 mx-1 text-sm '>{comp?.comments}</div>
      </div>
      </>
      })
    } */}
            <p className="text-sm text-slate-500" onClick={commentsModal}>
              View All Comments
            </p>
          </div>
        ) : (
          <></>
        )}
        <CommentsContainer>
          <CommentImages>
            <img
              src={`${
                currentUserProfileImage
                  ? `http://localhost:3001/${currentUserProfileImage}`
                  : DummyPic
              }`}
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
