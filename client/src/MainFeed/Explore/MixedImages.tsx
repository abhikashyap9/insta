import { useEffect, useState } from 'react'
import AddPosts from '../../services/addpost.service'
import { CiHeart } from "react-icons/ci";

function MixedImages(props) {
  const { openExploreModal } = props
  const [userPost, setUserPost] = useState([])
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

  useEffect(() => {
    AddPosts.userUpload().then((res) => {
      // console.log(res);
      setUserPost(res.data)
    })
  },[])
  return (
    <div>
      <div className="grid gap-2 grid-cols-3">
        {userPost.map((curr, index) => {
          return (
            <>
              <div
                className={`border border-gray-200 cursor-pointer `}
                key={index}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
                onClick={openExploreModal}
              >
                <div className="relative">
                  {isHovering && index === indexs ? (
                    <div className="absolute text-gray-900 saved_post">
                      <p>
                        {curr.likedBy.length}
                        <CiHeart />
                      </p>
                      <p className="pl-2">
                        <CiHeart />
                        {curr.comment.length}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <img
                    src={`http://localhost:3001/${curr.image}`}
                    alt="images1"
                    className={`object-cover h-40 w-full ${
                      isHovering && index === indexs
                        ? 'bg-black opacity-60'
                        : ''
                    }`}
                  />
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default MixedImages
