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
  const [postId, setPostId] = useState([])
  const [comment,setComment] =useState('')

  const handleClick = (e) => {

    setPostId(e)
    console.log(postId);
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
  }, [like])

  let userId = localStorage.getItem("userid")
  const handleLikeClicks = (e) => {
    setPostId(e)
    
    let like = userPost.find(curr => curr.id === e)
    if (like.likedBy?.includes(userId)) {
      AddPosts.removeLike(auth, postId).then((res) => {
        console.log(res);
        setLike(Math.random()*5);
      })
    }
    else {
      AddPosts.addLike(auth, postId).then((res) => {
        console.log('auth', res);
        setLike(Math.random()*5)
      })
    } 
  }
  
   const getCommentValues=(e)=>{
    console.log(e.target.value);
    setComment(e.target.value)
   }
   const share=(postId)=>{
  
    let data ={
      comment:comment
    }
     AddPost.addComment(auth,postId,data).then((res)=>{
      console.log(res);
     })
   }
 
  // console.log('userPost', userPost)
 console.log('userPost',userPost);

  const isDesktopResolution = useMatchMedia("(min-width:1024px)", true);

  return (

    <div>
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
              showComments={console.log('new lafda',current?.comment) || current?.comment}
            //  postProfile={console.log( current.userId?.profilePicture[0]) || current.userId?.profilePicture}
            />
          )
        })
      }

      <div className="lg:basis-1/5 md:basis-0 xs:basis-0 sm:basis-0">
        {isDesktopResolution && <Footer />}
      </div>
    </div>

  )

}

export default Feed;