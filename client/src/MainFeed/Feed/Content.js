import React from 'react'
import Stories from 'react-insta-stories';

function Content() {
    const stories=[
        {
          content: (props) => (
            <div style={{ background: 'pink', padding: 20,width:'100%',height:'100%'}}>
             {/* <div className='text-pink cursor-pointer' onClick={()=>setisShowStorie(false)}>Close</div> */}
              <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
              <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
            </div>
          ),
        },
        {
          content: (props) => (
            
         
            <div style={{ background: 'pink', padding: 20,width:'100%',height:'100%'}}>
            {/* <div className='text-white cursor-pointer' >Close</div> */}
              <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
              <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
            </div>
            
          ),
        },  
        {
          url: 'http://res.cloudinary.com/duloaclhy/video/upload/v1676566791/gatupa8uosqsgpyooyxl.mp4',
          duration: 5000, // ignored
          type: 'video',
        
        },
        
        ]
  return (
   <>
    <div style={{ width: "400px", height: "600px" }}>
       
       <Stories
    stories={stories}
    defaultInterval={8000}
    width={432}
    height={768}
    storyStyles={{storyContent: {
  width: 'auto',
  maxWidth: '200%',
  maxHeight: '100%',
  margin: 'auto'
  }}}
   
  /> </div>
    </>
  )
}

export default Content