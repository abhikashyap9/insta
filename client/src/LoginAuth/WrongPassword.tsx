import React from 'react'
import { Link } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import tw from 'tailwind-styled-components'
// import DummyPic from '../../../src/image/dumyPic.svg.png'
import { useEffect,useState } from 'react'
import './LoginAuth.css'

const EditAndProfileButton = tw.button`${(props) =>
  !props.primary
    ? 'bg-sky-500 text-white px-4'
    : 'bg-white-100 px-2'} border border-gray-200  py-0.5 rounded-sm`
const ModalContent = tw.div`modal-content wrong_password p-3`
const ModalHeader = tw.div`border-gray-200 border-2 p-0.5 py-1 w-4/6 mx-auto rounded-md cursor-pointer text-gray-900 wrong_password_header`
const HeaderText = tw.p`text-center font-semibold text-base`
const ModalContentInside = tw.div`flex flex-col `
const ModalContentBox = tw.div`border-gray-400 py-2 cursor-pointer flex justify-between px-4 items-center hover:bg-slate-100 rounded`
const ModalContentBoxFlex = tw.div`flex items-center py-0.5 `

function WrongPasswordModal(props) {
    const {closeLikesModal,closePasswordModal}=props
  
  return (
    <>
      <div id="myModal" className="modal">
        <ModalContent>
          
          <ModalContentInside>
            <div className='mx-auto w-3/5'>
                <h1 className='font-medium text-lg text-center py-1'>Incorrect Password</h1>
                <p className='text-center pb-1'>The Password You Entered Is Wrong</p>
            </div>


          </ModalContentInside>
          <ModalHeader>
            <HeaderText onClick={closePasswordModal}>
                <p>OK</p>
            </HeaderText>
          </ModalHeader>
        </ModalContent>
      </div>
    </>
  )
}

export default WrongPasswordModal
