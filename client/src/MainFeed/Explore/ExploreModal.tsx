import tw from 'tailwind-styled-components'
import { GrClear } from "react-icons/gr";
import { useEffect, useState } from 'react'
import Posts from '../Feed/Posts.js'
import AddPosts from '../../services/addpost.service.js'
import '../Profile/Profile.css'
import CommentsModal from '../Feed/CommentsModal.js'
import LikesModal from '../Feed/LikesModal.js'
import UserProfile from '../../services/userProfile.service.js'

const EditAndProfileButton = tw.button`${(props) =>
  !props.primary
    ? 'bg-sky-500 text-white px-4'
    : 'bg-white-100 px-2'} border border-gray-200  py-0.5 rounded-sm`
const ModalContent = tw.div`modal-content commentsModal`
const ModalHeader = tw.div`border-b-gray-200 border-b-2 p-1 py-1.5`
const HeaderText = tw.p`text-center font-semibold text-base`
const ModalContentInside = tw.div`flex flex-col o`
const ModalContentBox = tw.div`border-gray-400 py-2 cursor-pointer flex justify-between px-4 items-center hover:bg-slate-100 rounded`
const ModalContentBoxFlex = tw.div`flex items-center py-0.5 `

function ExploreModal(props) {
  //   const { closeLikesModal, likesCounts, follow, unfollow, followCount } = props
  const { closeProfileModal } = props

  const [like, setLike] = useState(0)
  const [userData, setUserData] = useState([])
  const [isLikesModal, setIsLikesModal] = useState(false)
  const [isCommentsModal, setIsCommentsModal] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const [commentsCounts, setCommentsCounts] = useState({
    postUrl: '',
    comment: [],
    caption: '',
    userId: {},
    createdAt: '',
    ids: '',
  })
  const [replyValues, setReplyValues] = useState({
    postId: '',
    commentId: '',
    isReply: false,
  })
  const [followCount, setFollowCount] = useState('63daa9864a614953d422a8d9')
  const [likesCounts, setLikesCounts] = useState([])
  const [comment, setComment] = useState('')
  const [currentUser, setCurrentUser] = useState([])

  let userId = localStorage.getItem('userid')
  let auth = localStorage.getItem('token')
  let username = localStorage.getItem('username')
  useEffect(() => {
    AddPosts.userUpload().then((res) => {
      // console.log(res);
      setUserData(res.data)
    })
  }, [])
  const handleLikeClicks = (e) => {
    let like = userData.find((curr) => curr.id === e)
    console.log(like)
    let isLike = like.likedBy?.some((el) => el.userName === username)

    if (isLike) {
      AddPosts.removeLike(auth, e).then((res) => {
        // console.log(res);
        setLike(Math.random() * 5)
      })
    } else {
      AddPosts.addLike(auth, e).then((res) => {
        // console.log("auth", res);
        setLike(Math.random() * 5)
      })
    }
  }

  const likesModal = (id) => {
    AddPosts.userUpload().then((res) => {
      console.log(res)
      let { data } = res
      console.log(data)
      let usersLike = data?.find((e) => e.id === id)
      setFollowCount(id)
      let e = usersLike?.likedBy
      setIsLikesModal(true)
      setLikesCounts(e)
    })
    document.body.style.overflowY = 'hidden'
  }

  const closeLikesModal = () => {
    setIsLikesModal(false)
    document.body.style.overflowY = ''
  }
  const getCommentValues = (e) => {
    setCommentValue(e.target.value)
    setComment(e.target.value)
  }

  const share = (postId) => {
    if (replyValues.isReply) {
      const { commentId, postId } = replyValues
      let data = {
        postId: postId,
        comment: commentValue,
      }

      AddPosts.addReply(auth, commentId, data).then((res) => {
        console.log(res)
        setLike(Math.random() * 5)
        // setCommentsCounts({...commentsCounts,comment:res.data.comment})
        setCommentValue('')
        setReplyValues({ ...replyValues, isReply: false })
      })
    } else {
      let data = {
        comment: comment,
      }
      AddPosts.addComment(auth, postId, data).then((res) => {
        console.log(res)
        setLike(Math.random() * 5)
        setCommentsCounts({ ...commentsCounts, comment: res.data.comment })
        setCommentValue('')
      })
    }
  }

  const commentsModal = (id) => {
    AddPosts.userUpload().then((res) => {
      console.log(res)
      let { data } = res
      console.log(data)
      let usersComments = data?.find((e) => e.id === id)
      console.log(usersComments)
      const { image, comment, caption, userId, createdAt } = usersComments

      setIsCommentsModal(true)
      setCommentsCounts({
        ...commentsCounts,
        postUrl: image,
        comment: comment,
        caption: caption,
        userId: userId,
        createdAt: createdAt,
        ids: id,
      })
      document.body.style.overflowY = 'hidden'
    })
  }
  const closeCommentsModal = () => {
    setIsCommentsModal(false)
    document.body.style.overflowY = ''
  }

  const sendCommentId = (commentId, userName) => {
    console.log(commentId, userName, commentsCounts.ids)
    let value = `@${userName}`
    setCommentValue(value)
    console.log(commentValue)
    setReplyValues({
      ...replyValues,
      postId: commentsCounts.ids,
      commentId: commentId,
      isReply: true,
    })
  }

  const deleteComment = (id) => {
    let postId = commentsCounts.ids

    AddPosts.deleteComment(auth, id, postId).then((res) => {
      console.log(res)
      setCommentsCounts({ ...commentsCounts })
      commentsModal(postId)
    })
  }

  const deleteCommentReply = (id) => {
    let postId = commentsCounts.ids
    console.log(id)
    AddPosts.deleteCommentReply(auth, id).then((res) => {
      commentsModal(postId)
    })
  }

  const follow = (id) => {
    UserProfile.userFollow(id, auth).then((res) => {
      let data = res.data
      setLike(Math.random() * 5)

      likesModal(followCount)
    })
  }

  const unfollow = (id) => {
    UserProfile.userUnfollow(id, auth).then((res) => {
      // setFollowDone(2)
      let data = res.data
      setLike(Math.random() * 5)
      likesModal(followCount)
    })
  }

  console.log(userData)
  return (
    <>
      <div id="myModal" className="modal profile_image_modal">
        {isCommentsModal && (
          <CommentsModal
            closeCommentsModal={closeCommentsModal}
            commentsCount={commentsCounts}
            setCommentValue={commentValue}
            getCommentValues={getCommentValues}
            share={share}
            sendCommentId={sendCommentId}
            deleteComment={deleteComment}
            deleteCommentReply={deleteCommentReply}
          />
        )}

        {isLikesModal && (
          <LikesModal
            closeLikesModal={closeLikesModal}
            likesCounts={likesCounts}
            followCount={followCount}
            follow={follow}
            unfollow={unfollow}
          />
        )}
        <ModalContent>
          <ModalHeader className="">
            <div>
              <HeaderText>
                Posts{' '}
                <GrClear
                  style={{
                    float: 'right',
                    marginTop: '2px',
                    cursor: 'pointer',
                  }}
                  onClick={closeProfileModal}
                />
              </HeaderText>
            </div>
          </ModalHeader>
          <ModalContentInside>
            <div className="scrollable ">
              {userData.length > 0 ? (
                userData?.map((current, index) => {
                  return (
                    <div>
                      {' '}
                      <Posts
                        keys={index}
                        name={current.userId.userName}
                        location={current.location}
                        userImages={current.image}
                        caption={current.caption}
                        userName={current.userId.userName}
                        active={
                          current.likedBy?.some(
                            (el) => el.userName === username
                          )
                            ? 'active'
                            : 'notactive'
                        }
                        handleLikeClicks={() => handleLikeClicks(current.id)}
                        key={current.id}
                        user={current.userId.id}
                        share={() => share(current.id)}
                        getCommentValues={getCommentValues}
                        showComments={current?.comment}
                        postProfile={current.userId?.profilePicture[0]}
                        setCommentValue={commentValue}
                        currentUserProfileImage={currentUser}
                        count={current.likedBy}
                        openLikesModal={() => likesModal(current.id)}
                        openCommentsModal={() => commentsModal(current.id)}
                        commentsModal={() => commentsModal(current.id)}
                      />
                    </div>
                  )
                })
              ) : (
                <></>
              )}
            </div>
          </ModalContentInside>
        </ModalContent>
      </div>
    </>
  )
}

export default ExploreModal
