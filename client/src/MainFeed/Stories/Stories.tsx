import { current } from '@reduxjs/toolkit'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SlControlPlay } from "react-icons/sl";
import './Stories.css'
import { useSelector } from 'react-redux'
import DummyPic from '../../../src/image/dumyPic.svg.png'

function Storiess(props) {
  const { addStories, showPhoto, stories } = props

  const currentUser = useSelector((state) => state.userData)
  const { userProfilePicture } = currentUser

  return (
    <div className="">
      <div className="flex px-4 border-2 border-white-800 rounded-lg my-4 bg-white">
        <div
          className="border-4 border-rose-800 rounded-full ... m-2 cursor-pointer relative h-14 w-14 "
          onClick={addStories}
        >
          <div className="absolute add_stories bg-slate-50">
            <SlControlPlay className="text-blue-400" />
          </div>
          <img
            className="inline-block h-full w-full rounded-full ring-2 ring-white object-cover"
            src={`${
              userProfilePicture
                ? `http://localhost:3001/${userProfilePicture}`
                : DummyPic
            }`}
            alt="stores"
          />
        </div>

        {stories.length > 0 ? (
          stories.map((current, index) => {
            return (
              <>
                <div className="flex flex-col cursor-pointer" key={index}>
                  <div
                    className="border-4 border-rose-800 rounded-full ... m-2 h-12 w-12 "
                    onClick={() => showPhoto(index)}
                  >
                    <img
                      className="inline-block h-full w-full rounded-full ring-2 ring-white cursor-pointer relative object-cover"
                      src={`${
                        current.userId.profilePicture.length > 0
                          ? `http://localhost:3001/${current.userId.profilePicture[0]}`
                          : DummyPic
                      }`}
                      alt="stores"
                    />
                  </div>
                  <p className="text-xs">{current.userId.userName}</p>
                </div>
              </>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Storiess
