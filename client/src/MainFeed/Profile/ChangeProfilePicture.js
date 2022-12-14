import React from 'react'

function ChangeProfilePicture(props) {
    
    const{ open }=props
     
  return (
    <>
        <div className='flex items-center'>
          <div className='px-8 basis-1/3 text-right '>
          <img src="https://img.freepik.com/free-vector/attractive-man-s-face-dissolving-into-pen-lines-sketch-illustration_460848-14175.jpg?w=740&t=st=1667829996~exp=1667830596~hmac=7f5f30d9a5647fe8d04b30aad16f6b41cf7a744c6e7c18f2a73ad56ea1847bdf"
           alt="pofile" 
           load="lazy" 
           className="inline-block rounded-full ring-2 ring-white h-20"/>
          </div>
          <div className='basis-3/5'>
            <p>NAme</p>
            <p className='text-blue-800 cursor-pointer' onClick={open}>Change Profile Picture</p>
          </div>
        </div>

    </>
  )
}

export default ChangeProfilePicture