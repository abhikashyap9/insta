import React from 'react'
import { useMatchMedia } from '../Sidebar/useMediaMatch';

// import { ReactComponent as BrandIcon } from "../../../public/";
// import {FaInstagram} from 'react-icons/fa'



function Feedoption(props) {

  const {likesCount,modal,Icon,rightBorder}=props;
  const isDesktopResolution = useMatchMedia('(min-width:600px)', true)


  return (
    <>
    <div className={`m-auto lg:border-r-${rightBorder} lg:px-6 sm:px-1 mt-2 lg:border-gray-300 w-full flex items-center cursor-pointer text-sm font-normal`} onClick={modal}>
    <div >{Icon}</div>
    {isDesktopResolution && <div className="ml-1">{likesCount}</div>}
    {/* <FontAwesomeIcon icon={faHeart} className="text-lg text-red-600"/> */}
    </div>
    </>
  )

}

export default Feedoption