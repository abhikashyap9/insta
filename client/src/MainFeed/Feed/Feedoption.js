import React from 'react'


function Feedoption(props) {

  const {likesCount,modal,Icon}=props;

  return (
    <>
    <div className='border-r-2 px-2 mt-2 border-gray-300 w-full flex items-center cursor-pointer' onClick={modal}>
    <div >{Icon}</div>
    <div className="ml-1">{likesCount}</div>
    </div>
    </>
  )

}

export default Feedoption