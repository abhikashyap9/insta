import React from 'react'
import { Link } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import tw from 'tailwind-styled-components'
import DummyPic from '../../../src/image/dumyPic.svg.png'
import { useEffect,useState } from 'react'

const EditAndProfileButton = tw.button`${(props) =>
  !props.primary
    ? 'bg-sky-500 text-white px-4'
    : 'bg-white-100 px-2'} border border-gray-200  py-0.5 rounded-sm`
const ModalContent = tw.div`modal-content likes_modal`
const ModalHeader = tw.div`border-b-gray-200 border-b-2 p-1 py-1.5`
const HeaderText = tw.p`text-center font-semibold text-base`
const ModalContentInside = tw.div`flex flex-col `
const ModalContentBox = tw.div`border-gray-400 py-2 cursor-pointer flex justify-between px-4 items-center hover:bg-slate-100 rounded`
const ModalContentBoxFlex = tw.div`flex items-center py-0.5 `

function LikesModal(props) {
  const { closeLikesModal, likesCounts, follow, unfollow, followCount } = props
  let userId = localStorage.getItem('userid')
  return (
    <>
      <div id="myModal" className="modal ">
        <ModalContent>
          <ModalHeader className="">
            <div>
              <HeaderText>
                Likes{' '}
                <ClearIcon
                  style={{
                    float: 'right',
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                  onClick={closeLikesModal}
                />
              </HeaderText>
            </div>
          </ModalHeader>
          <ModalContentInside>
            {likesCounts.length > 0 &&
              likesCounts?.map((likes, index) => {
                return (
                  <>
                    <ModalContentBox key={index}>
                      <Link
                        to={
                          userId !== likes.id
                            ? `../profile/${likes.id}`
                            : `/profile`
                        }
                      >
                        <ModalContentBoxFlex>
                          <div className="px-1">
                            <div
                            // className="flex"
                            // onClick={()=>showPhoto(index)}
                            >
                              <img
                                className="h-12 w-12 object-cover rounded-full"
                                src={`${
                                  likes.profilePicture.length > 0
                                    ? `http://localhost:3001/${likes.profilePicture[0]}`
                                    : DummyPic
                                }`}
                                alt="stores"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {likes.userName}
                            </p>
                            <p className="text-sm text-slate-400">
                              {likes.fullName}{' '}
                            </p>
                          </div>
                        </ModalContentBoxFlex>
                      </Link>

                      <div>
                        {!likes?.id?.includes(userId) ? (
                          <EditAndProfileButton
                            primary={
                              likes?.followers?.includes(userId)
                                ? 'primary'
                                : ''
                            }
                            type="button"
                            onClick={
                              likes?.followers?.includes(userId)
                                ? () => unfollow(likes.id)
                                : () => follow(likes.id)
                            }
                          >
                            {/* {editOrFollow} */}
                            {likes?.followers?.includes(userId)
                              ? 'Unfollow'
                              : 'Follow'}
                          </EditAndProfileButton>
                        ) : (
                          <></>
                        )}
                      </div>
                    </ModalContentBox>
                    {/* <p>{users.userName}</p> */}
                  </>
                )
              })}
          </ModalContentInside>
        </ModalContent>
      </div>
    </>
  )
}

export default LikesModal
