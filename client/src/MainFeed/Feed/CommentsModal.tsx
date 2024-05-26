import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import DummyPic from '../../../src/image/dumyPic.svg.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GrClear } from "react-icons/gr";

const EditAndProfileButton = tw.button`${(props) =>
  !props.primary
    ? 'bg-sky-500 text-white px-4'
    : 'bg-white-100 px-2'} border border-gray-200  py-0.5 rounded-sm`
const ModalContent = tw.div`modal-content comments`
const ModalHeader = tw.div`border-b-gray-200 border-b-2 p-1 py-1.5`
const HeaderText = tw.p`text-center font-semibold text-base`
const ModalContentInside = tw.div`w-full flex flex-col`
const ModalContentBox = tw.div`border-gray-400 py-2 cursor-pointer flex justify-between items-center `
const ModalContentBoxFlex = tw.div`flex py-0.5 `
const CommentsContainer = tw.div`flex items-center p-1`
const CommentImages = tw.div`border-4 border-rose-400 rounded-full ...  cursor-pointer m-2`
const CommentsInput = tw.div`basis-5/6`
const CommentButton = tw.div`basis-1/12 text-sky-700 text-md `
const CommentButtonPost = tw.button`text-sm disabled:opacity-100 ... disabled:opacity-25 ...`

function CommentsModal(props) {
  const {
    closeCommentsModal,
    commentsCount,
    getCommentValues,
    setCommentValue,
    share,
    sendCommentId,
    deleteComment,
    deleteCommentReply
  } = props
  const [repliesIsOpen, setRepliesIsOpen] = useState(false)
  const [shownReplies, setShownReplies] = useState({
    replies: '',
    isReplyOpen: false,
  })
  const [replyId, setReplyId] = useState([])
  let userId = localStorage.getItem('userid')
  const currentUser = useSelector((state) => state.userData)
  const { userProfilePicture } = currentUser
  const openReplies = (id) => {
    commentsCount.comment.map((curr) => {
      if (curr._id == id) {
        curr.isReplyOpen = true
      }
    })
    setRepliesIsOpen((prev) => !prev)
    
  }



  const closeReplies = (id) => {
    commentsCount.comment.map((curr) => {
      if (curr._id == id) {
        curr.isReplyOpen = false
      }
    })
    setRepliesIsOpen((prev) => !prev)
    
  }

console.log(commentsCount)

  let userName=localStorage.getItem("username")


  return (
    <>
      <div id="myModal" className="modal">
        <ModalContent>
          <GrClear
            style={{
              float: 'right',
              marginTop: '2px',
              cursor: 'pointer',
            }}
            onClick={closeCommentsModal}
          />
          <ModalHeader>
            <div>
              <HeaderText>Comments</HeaderText>
            </div>
          </ModalHeader>
          {/* <div className='flex'> */}
          {/* <div className='w-1/2'><img 
           src={`http://localhost:3001/${commentsCount.postUrl}`}
           alt=''
           className='h-full'
           />
           </div>  */}
          {/* .................................................................................................... */}

          <ModalContentInside>
            {commentsCount.caption.length > 0 ? (
              <div className="border-b-gray-200 border-b-2 p-2 ">
                {/* <div className='flex w-1/2'>
               <div>
               <img src={`http://localhost:3001/${commentsCount.postUrl}`}/>
               </div>
               <div>
                  <p>Name</p>
                  <p>Caption</p>
               </div>
               </div> */}

                <Link
                  to={
                    userId !== commentsCount.userId.id
                      ? `../profile/${commentsCount.userId.id}`
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
                            commentsCount.userId.profilePicture.length > 0
                              ? `http://localhost:3001/${commentsCount.userId.profilePicture[0]}`
                              : DummyPic
                          }`}
                          alt="stores"
                        />
                      </div>
                    </div>

                    <div className="">
                      <p className="text-sm font-medium">
                        {commentsCount.userId.userName}
                      </p>
                      <p className="text-sm text-slate-400">
                        {commentsCount.caption}{' '}
                      </p>
                    </div>
                  </ModalContentBoxFlex>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {/* ...................................................................................................       */}
            <div className="overflow-y-scroll h-64 border-b-gray-200 border-b-2 p-2 comments_contents">
              {commentsCount.comment.length === 0 && <>NoComments To Show</>}
              {commentsCount.comment.length > 0 &&
                commentsCount.comment?.map((comments, index) => {
                  return (
                    <>
                      <ModalContentBox key={index}>
                        <ModalContentBoxFlex>
                          <Link
                            to={
                              userId !== comments.postedBy.id
                                ? `../profile/${comments.postedBy.id}`
                                : `/profile`
                            }
                          >
                            <div className="px-1">
                              <div
                              // className="flex"
                              // onClick={()=>showPhoto(index)}
                              >
                                <img
                                  className="h-8 w-8 object-cover rounded-full"
                                  src={`${
                                    comments.postedBy.profilePicture.length > 0
                                      ? `http://localhost:3001/${comments.postedBy.profilePicture[0]}`
                                      : DummyPic
                                  }`}
                                  alt="stores"
                                />
                              </div>
                            </div>
                          </Link>

                          <div>
                            <div className="flex items-center">
                              <Link
                                to={
                                  userId !== comments.postedBy.id
                                    ? `../profile/${comments.postedBy.id}`
                                    : `/profile`
                                }
                              >
                                <p className="text-sm font-medium">
                                  {comments.postedBy.userName}
                                </p>
                              </Link>
                              <p className="text-xs px-2">
                                {comments.comments}{' '}
                              </p>
                             {userName==comments.postedBy.userName? <p className='text-xs text-red-700'  onClick={()=>deleteComment(comments._id)}>Delete</p>:<></>}
                            </div>
                            <p
                              className="text-xs text-slate-500"
                              onClick={() =>
                                sendCommentId(
                                  comments._id,
                                  comments.postedBy.userName
                                )
                              }
                            >
                              Reply
                            </p>

                            {
                            (comments.replies &&
                              comments.replies.length > 0 &&
                              !comments.isReplyOpen) ? (
                              <p
                                className="text-xs text-slate-500 cursor-pointer"
                                onClick={() => openReplies(comments._id)}
                              >
                                <span className="w-6 h-0.5">-</span>
                                View {comments.replies.length} replies
                              </p>
                            ) :
                              (comments.replies &&
                                comments.replies.length > 0 &&
                                comments.isReplyOpen) ? (
                              <div className="mine">
                                {comments.replies.map((reply, index) => {
                                  return (
                                    <div key={index}>
                                        <ModalContentBoxFlex className='items-center'>
                    <div className="px-1">
                      <div
                      // className="flex"
                      // onClick={()=>showPhoto(index)}
                      >
                        <img
                          className="h-8 w-8 object-cover rounded-full"
                          src={`${
                            reply.postedBy.profilePicture.length > 0
                              ? `http://localhost:3001/${reply.postedBy.profilePicture[0]}`
                              : DummyPic
                          }`}
                          alt="stores"
                        />
                      </div>
                    </div>

                    <div className="">
                      <p className="text-xs">
                        {reply.postedBy.userName}
                        { userName==reply.postedBy.userName? <span className='text-xs text-red-700 px-3' onClick={()=>deleteCommentReply(reply.id)}>Delete</span>:<></>}

                      </p>
                      <p className="text-xs text-slate-400">
                        {reply.reply}{' '}
                      </p>
                      <p className="text-xs text-slate-400">
                        Reply
                      </p>

                    </div>
                  </ModalContentBoxFlex>
               </div>
                                  )
                                })}
                                <p
                                  className="text-xs text-slate-500 cursor-pointer p-1"
                                  onClick={() => closeReplies(comments._id)}
                                >
                                  <span className="w-6 h-0.5">-</span>
                                  HideReplies
                                </p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </ModalContentBoxFlex>
                      </ModalContentBox>
                      {/* <p>{users.userName}</p> */}
                    </>
                  )
                })}
            </div>

            {/* ......................................................../ */}

            {/* <div >
                <div className='flex'>
            <div><img src={`http://localhost:3001/${commentsCount.postUrl}` 
        
        }
        className="h-8 w-8 object-cover rounded-full"
        /></div>
            <div><input type='text' placeholder='add comment' className='border-gray-200 border-2 rounded-md'/></div>
            </div>
          </div> */}
            <CommentsContainer>
              <CommentImages>
                <img
                  src={`http://localhost:3001/${userProfilePicture}`}
                  alt="profile"
                  load="lazy"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                />
              </CommentImages>
              <CommentsInput>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="outline-none"
                  onChange={getCommentValues}
                  value={setCommentValue}
                />
              </CommentsInput>
              <CommentButton>
                <CommentButtonPost onClick={() => share(commentsCount.ids)}>
                  Post
                </CommentButtonPost>
              </CommentButton>
            </CommentsContainer>
          </ModalContentInside>

          {/* </div> */}
        </ModalContent>
      </div>
    </>
  )
}

export default CommentsModal
