import React from 'react'
import Stories from 'react-insta-stories';

function Content2(props) {
    // const {storiesCollection}=props
   
    // let storie=storiesCollection[0].storie
    // console.log('dera',storie)
   
    // let newStories=storie.map(curr=>(
    //   {
    //     url: curr.url,
    //     duration: 5000,
    //     type:curr.identifier,
    //     header:{
    //       heading:storiesCollection[0].userId.userName,
    //       subheading: 'Posted 30m ago',
    //     }
    //   }
    // ))
    // console.log(newStories)
    // const stories=[
      
    //   {
    //     url: "http://res.cloudinary.com/duloaclhy/video/upload/v1677485342/rti3mhuodoh4lupqras1.mp4",
    //     duration: 5000,
    //     type:'video',
    //     header: {
    //       heading: 'Mohit Karekar',
    //       subheading: 'Posted 30m ago',
    //       profileImage: 'https://picsum.photos/100/100',
    //     },
    //   },

        
    //     ]
  return (
   <>
    <div style={{ width: "400px", height: "600px" }}>
       
       <div className="bg-[url('data:image/jpeg;base64,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')] h-96 w-80">
      </div>
      </div>
    </>
  )
}

export default Content2