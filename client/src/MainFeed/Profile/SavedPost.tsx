import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoChatboxEllipses } from "react-icons/io5";

function SavedPost(props) {
  const { userData, openProfileModal } = props
  const [isHovering, setIsHovering] = useState(false)
  const [indexs, setIndex] = useState('')
  const handleMouseOver = (ind) => {
    console.log(ind)
    setIsHovering(true)
    setIndex(ind)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }
  console.log(userData)

  return (
    <>
      <div className="grid gap-2 grid-cols-3">
        {userData.map((curr, index) => {
          return (
            <>
              <div
                className="cursor-pointer relative"
                onClick={openProfileModal}
                key={index}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
              >
                {isHovering && index === indexs ? (
                  <div className="absolute text-white saved_post">
                    <p>
                      {curr.likedBy.length}
                      <CiHeart />
                    </p>
                    <p className="pl-2">
                      <IoChatboxEllipses />
                      {curr.comment.length}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <img
                  src={`http://localhost:3001/${curr.image}`}
                  alt="images1"
                  className="object-cover h-40 w-full"
                />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default SavedPost
