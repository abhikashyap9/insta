import React, { useEffect } from 'react'
import Stories from 'react-insta-stories';
import { useSelector } from 'react-redux';
import DummyPic from '../../../src/image/dumyPic.svg.png'


function Content(props) {
    const {storiesCollection}=props
   const currentStorie=useSelector((state)=>state.currentStorie.initialState) 
    let name=storiesCollection.userId.userName
    let storie=currentStorie.storie
    let profilePicture=storiesCollection.userId.profilePicture.length>0?`http://localhost:3001/${storiesCollection.userId.profilePicture[0]}`:DummyPic
    console.log(storie,name)

  useEffect(()=>{
     
  },[name])
    const myFunction=()=>{
      // alert('HELLO guys')
    }
    let newStories=Array.isArray(storie) && storie.map(curr=>(
      {
        url: curr.url,
        duration: 5000,
        type:curr.identifier,
        header:{
          heading:name,
          subheading: 'Posted 30m ago',
          profileImage: profilePicture,
        }
      }
    )) 
    console.log(newStories)
    const stories=[
      
      // {
      //   url: "http://res.cloudinary.com/duloaclhy/video/upload/v1677485342/rti3mhuodoh4lupqras1.mp4",
      //   duration: 5000,
      //   type:'video',
      //   header: {
      //     heading: 'Mohit Karekar',
      //     subheading: 'Posted 30m ago',
      //     profileImage: 'https://picsum.photos/100/100',
      //   },
      // },
    
      ...newStories
        
        ]

        // console.log(stories)
  return (
   <>
    <div style={{ maxWidth: "100%", height: "600px" }}
    className={'xs:w-11/12'}
    >
       
    <Stories
        stories={stories}
        defaultInterval={8000}
        width={432}
        height={768}
       
        storyContainerStyles={{ borderRadius: 8, overflow: 'hidden' }}
        // onStoryEnd={(s, st) => alert("story started", st.url)}
        // onAllStoriesEnd={(s, st) => alert("story started", st.url)}
        // onStoryStart={(s, st) => alert("story started", st.url)}
   
  /> </div>
    </>
  )
}

export default Content