import React from 'react'

function FollowCount(props) {
  const { count,info }=props

   return (

       <>
         <div className='mr-12'>
           <p><span className='font-medium'> {count}</span> {info}</p>
         </div> 
       </>
     )
}

export default FollowCount