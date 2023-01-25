import React, { useEffect, useState } from 'react';
import Stories from "../Stories/Stories.js";
import Posts from './Posts';
import AddPost from "../../services/addpost.service";
import Footer from '../Footer/Footer.js';
import { useMatchMedia } from '../Sidebar/useMediaMatch.js';
import AddPosts from '../../services/addpost.service';
import UserProfile from '../../services/userProfile.service.js';
import auth from '../../LoginAuth/auth.js';


function Feed(props) {

  const { name } = props;
  console.log("props", props);
  const [userPost, setUserPost] = useState([])
  const [like, setLike] = useState(0)
  const [comment,setComment] =useState('')
  const [commentValue,setCommentValue]=useState('')
  const [currentUser,setCurrentUser]=useState([])

  const handleClick = (e) => {
   
    switch (e.detail) {
      case 1:
        console.log("click")
        break;
      case 2:
        console.log("double click")
        break;
      case 3:
        console.log("triple click")
        // setActive(true)
        break;
    }
  };

  useEffect(() => {
    AddPosts.userUpload().then((res) => {
      console.log(res)
      setUserPost(res.data)
    })
    UserProfile.userGet(auth).then((res)=>{
     console.log('userGet',res) 
     let data =res.data;
     let profilePicture=data.profilePicture;
     let setProfile=profilePicture[0]

     setCurrentUser(setProfile)
    })
  }, [like])
  console.log('current',currentUser)
  let userId = localStorage.getItem("userid")
  const handleLikeClicks = (e) => {

    let like = userPost.find(curr => curr.id === e)
    if (like.likedBy?.includes(userId)) {
      AddPosts.removeLike(auth, e).then((res) => {
        console.log(res);
        setLike(Math.random()*5);
      })
    }
    else {
      AddPosts.addLike(auth, e).then((res) => {
        console.log('auth', res);
        setLike(Math.random()*5)
      })
    } 
  }
  
   const getCommentValues=(e)=>{
    console.log(e.target.value);
    setCommentValue(e.target.value)
    setComment(e.target.value)
   }
   const share=(postId)=>{
  
    let data ={
      comment:comment
    }
     AddPost.addComment(auth,postId,data).then((res)=>{
      console.log(res);
      setLike(Math.random()*5);
      setCommentValue('')
     })
   }
   
  // console.log('userPost', userPost)
 console.log('userPost',userPost);

  const isDesktopResolution = useMatchMedia("(min-width:1024px)", true);

  return (

    <div className='lg:w-4/5 sm:w-full flex justify-between'>
    <div className='lg:basis-3/5 sm:w-full'>
      <Stories />
      {
        userPost.map((current, index) => {
          return (
            <Posts
              name={current.userId.userName}
              location={current.location}
              userImages={current.image}
              caption={current.caption}
              userName={current.userId.userName}
              //  handleClick={()=>handleLikeClicks(current.id)}
              active={current.likedBy?.includes(userId) ? 'active' : 'notactive'}
              handleLikeClicks={() => handleLikeClicks(current.id)}
              //  userProfile={userProfile}
              //  getName={()=>getName(current.userId.id)}
              key={current.id}
              user={current.userId.id}
              share={()=>share(current.id)}
              getCommentValues={getCommentValues}
              showComments={current?.comment}
             postProfile={console.log( current.userId?.profilePicture[0]) || current.userId?.profilePicture[0]}
             setCommentValue={console.log('commentvalue in fee',commentValue) || commentValue}
             currentUserProfileImage={currentUser}
            />
          )
        })
      }
      </div>  
      <div >
        {isDesktopResolution && <Footer />}
      </div>
    </div>

  )

}

export default Feed;