import React from 'react'

function SavedPost(props) {
const {userData,openProfileModal}=props

  return (
    <>
<div className='grid gap-2 grid-cols-3'>

    {
   userData.map((curr,index)=>{
    return(
      <>
        <div className='cursor-pointer ' onClick={openProfileModal} key={index}>
        <img 
        src={`http://localhost:3001/${curr.image}`}
         alt='images1' 
         className='object-cover h-40'/>
         </div>
      </>
    )
   })
  }
      </div>
      
    </>
  )

}

export default SavedPost