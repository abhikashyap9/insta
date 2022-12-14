import React from 'react'
import tw from 'tailwind-styled-components'
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InfoIcon from '@mui/icons-material/Info';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LeftItems = tw.div` border-r-indigo-200 border-gray-800 basis-1/2 border-r`
const Header = tw.div`border-b py-3 text-center`
const MessageInfo1 = tw.div`flex py-2 cursor-pointer pl-2`
const MessageInfo=tw.div`flex py-1.5 cursor-pointer pl-2 items-center`
const Right = tw.div``
const ImageContainer = tw.div`pr-2`
const MessagesName=tw.div``
const RightItems=tw.div`basis-1/2`

function Message() {

  return (
    <div>
      <div className='flex border border-gray-100 bg-white'>

        <LeftItems>

          <Header><p>Abhishek</p></Header>
          <MessageInfo1>
            <ImageContainer className=''>
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrvOZf5zaHg_9a8upGltfVtObFu_0QH1rcw&usqp=CAU'
                alt='image' />
            </ImageContainer>
            <div className='text-xs'>
              <p className='text-sm'>Abhishek</p>
              <p className='text-xs text-gray-400'>Sent you a message</p>
            </div>
          </MessageInfo1>

        </LeftItems>

        <RightItems>
          <div className='border-b flex items-center justify-between'>
          <MessageInfo>
            <ImageContainer className=''>
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrvOZf5zaHg_9a8upGltfVtObFu_0QH1rcw&usqp=CAU'
                alt='image' />
            </ImageContainer>
            <div className='text-xs'>
              <p className='text-sm'>Abhishek</p>
              <p className='text-xs text-gray-400'>Sent you a message</p>
            </div>

            

          </MessageInfo>
          <div className='flex justify-between'>
               <div className='px-1 cursor-pointer'><CallIcon/></div>
               <div className='px-1 cursor-pointer'><VideoCallIcon/></div>
               <div className='px-1 cursor-pointer'><InfoIcon/></div>
            </div>
          </div>

          <div className='m-1.5'>
            <div className='border px-2 rounded-xl w-1/2 p-2 break-all '><p>Message Sent</p></div>
            <div className='border px-2 rounded-xl ml-auto w-1/2 bg-gray-100 p-2 break-all'><p>Recivbbbbbbbbbbbbbbbbbbbbbbbbbbbed Message</p></div>
          </div>

          <div className='flex m-1.5 sm:py-1 md:py-1 lg:py-2 rounded-md border border-gray-200 bg-gray-100'><input type="text" className='outline-none border-none w-full bg-transparent text-sm pl-2'/><PhotoLibraryIcon style={{ marginRight: 10 }}/>  <FavoriteBorderIcon style={{ marginRight: 10 }}/></div>
        </RightItems>

      </div>
    </div>
  )

}

export default Message;