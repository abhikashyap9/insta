import React from 'react'
import Stories from 'react-insta-stories';
import DummyPic from '../../../src/image/dumyPic.svg.png'
import './Feed.css'


function Content1(props) {
    const {storiesCollection,currentIndex}=props
    console.log(storiesCollection,currentIndex)
    let toShow=storiesCollection[currentIndex].userId.userName
    let urlEmp=storiesCollection[currentIndex].storie[0].identifier==='video'?storiesCollection[currentIndex].storie[0].thumbnailUrl:storiesCollection[currentIndex].storie[0].url
    let urlToShow=urlEmp?urlEmp:'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'
    var divStyle = {
      backgroundImage: 'url(' + urlToShow + ')'
  }

  let profileImage=storiesCollection[currentIndex].userId.profilePicture.length>0?`http://localhost:3001/${storiesCollection[currentIndex].userId.profilePicture[0]}`:DummyPic
  

    console.log(urlToShow)
    
   
   
  return (
   <>
    <div 
    style={{ width: "500px", height: "100vh" }}
    >
       
       <div
          className='carousel_height w-full rounded-md '
          style ={divStyle}>
        <div className='flex flex-col items-center'>
       <div> 
        <h1 className='text-6xl pt-72 text-white opacity-100'>{toShow}</h1></div>
          <div
        className="border-4 border-rose-800 rounded-full w-36 ... m-2 cursor-pointer bg-slate-500"
        // onClick={addStories}
      >
        <img
          className="inline-block rounded-full w-36 h-36 object-cover"
          src={profileImage}
          alt="stores"
        />
      </div>
      </div>

      </div>
      </div>
    </>
  )
}

export default Content1