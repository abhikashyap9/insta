import React, { useEffect, useState ,useRef } from "react";
import tw from "tailwind-styled-components";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import "../../App.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import UserProfile from "../../services/userProfile.service";
import Messages from "../../services/message.service";
import DummyPic from '../../image/dumyPic.svg.png'
import { useSelector, useDispatch } from 'react-redux'

// import instant from '../src/image/instant.svg';

// console.log(instant)

const socket = io.connect("http://localhost:3001");
console.log(socket);

// import {animate__slideOutRight} from 'react-animations/lib/animate__slideOutRight'

const LeftItems = tw.div`border-gray-200 basis-2/5 border-r`;
const Header = tw.div`border-b py-3 text-center h-14`;
const MessageInfo1 = tw.div`flex py-2 cursor-pointer pl-2`;
const MessageInfo = tw.div`flex py-1.5 cursor-pointer pl-2 items-center`;
const Right = tw.div``;
const ImageContainer = tw.div`pr-2`;
const MessagesName = tw.div``;
const RightItems = tw.div`basis-3/5 relative`;

function Message() {
  const [send, setSend] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ profilePic: "", name: "" });
  const [room, setRoom] = useState(null);
  const [showMessages, setShowMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [savedMessages, setSavedMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [typing,setTyping]=useState(false);

  const { id } = useParams();

  
  


  let auth = localStorage.getItem("token");
  useEffect(() => {
    UserProfile.getUserById(id).then((res) => {
      setUser(res.data);
      let data = res.data;
      const { profilePicture, userName } = data;
      const profileImage = profilePicture[0];
      setUser({ ...user, profilePic: profileImage, name: userName });
    });

    UserProfile.userGet(auth).then((res) => {
      setCurrentUser(res.data.userName);
    });

    Messages.getRoom(id, auth).then((res) => {
      socket.emit("join_room", res.data[0].id);
      let room = res.data[0].id;
      setRoom(room);
      let data = res.data[0].messages;
      setShowMessages(data)
      console.log(res)
    });

    Messages.getCurrentUserRoom(auth).then((res) => {
      
      let data = res.data;
      console.log(data)
      let userId = data.map((curr) => curr.chatMembers[0]).map((curr) => curr.userId);
      let messanderId = data.map((curr) => curr.chatMembers[0]).map((curr) => curr.messangerId);
      let userChat = [];
      for(let i=0;i<messanderId.length;i++){
        if(Object.keys(userId[i]).length<Object.keys(messanderId[i]).length){
         userChat.push(userId[i]);
      }else{
           userChat.push(messanderId[i]);
      }}
      setChatList(userChat);
    });
  }, []);
  
  console.log('ChatList',chatList)
  console.log('show',showMessages) 



  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    
    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [socket]);
  
  
  
  const getMessagesValues = (e) => {
    let messageValue = e.target.value;
    setMessage(messageValue);
    if (messageValue.length >= 1) {
      setSend(true);
    } else {
      setSend(false);
    }
  };
  
  const sendPing = async () => {
    
    const messageData = {
      room: room,
      message: message,
      author: currentUser,
      time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
    };
    await socket.emit("ping", messageData);
    setShowMessages((list) => [...list, messageData]);
    setMessage('');
    let data = {
      messageData: messageData,
    };
    
    Messages.savedMessages(room, auth, data).then((res) => {
      
      console.log(res);
    });
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
     
      setShowMessages((list) => [...list, data]);
    });
    return function cleanup() {
      socket.off("receive_message");
    };
  }, [socket]);
  
  const setChat=(id)=>{
   console.log(id)
   Messages.getRoom(id, auth).then((res) => {
     let data=res.data
     socket.emit("join_room", data[0].id);
    let room = data[0].id;
    setRoom(room);
    let messages = data[0].messages;
    setShowMessages(messages)
    console.log(res)
    let userId=Object.keys(data[0].chatMembers[0].userId).length
let messangerId=Object.keys(data[0].chatMembers[0].messangerId).length

if(userId>messangerId){
    
    let profileImage=data[0].chatMembers[0].messangerId.profilePicture[0]
    let name=data[0].chatMembers[0].messangerId.userName
    setUser({ ...user, profilePic: profileImage, name: name });
}else{
  
    let profileImage=data[0].chatMembers[0].userId.profilePicture[0];
    let name=data[0].chatMembers[0].userId.userName
    setUser({ ...user, profilePic: profileImage, name: name })
}
  });
  }
  
  socket.on('typing', (room)=> {
    setTyping(true)
  });
  socket.on('stoptyping', (room)=> {
      setTyping(false)   
  });
 
  

  console.log('Roooommmmm',room)
  
  

  // const callPeer = () => {
  //   const call = peer.call(remoteId, localStream);
  //   call.on('stream', (remoteStream) => {
  //     setRemoteStream(remoteStream)
  //   })

  // };
  return (
    <div className="lg:w-4/5 md:w-full sm:w-full">
    
      <div className="messages_container  flex border border-gray-200 bg-white  m-6">
        <LeftItems>
          <Header>
            <p>{currentUser}</p>
          </Header>
          {chatList.map((curr) => {
            return(
            <MessageInfo1 onClick={()=>setChat(curr.id)}>
              <ImageContainer className="">
                <img
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={`${curr.profilePicture.length>0 ? `http://localhost:3001/${curr?.profilePicture[0]}`:DummyPic}`}
                  alt="image"
                />
              </ImageContainer>
              <div className="text-xs">
                <p className="text-sm">{curr.userName}</p>
                <p className="text-xs text-gray-400">Sent you a message</p>
              </div>
            </MessageInfo1>
            )
          })}
        </LeftItems>
       
        <RightItems>
         {room ? <> <div className="border-b flex items-center justify-between px-2 h-14 ">
            <MessageInfo>
              <ImageContainer className="">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src={`http://localhost:3001/${user.profilePic}`}
                  alt="image"
                />
              </ImageContainer>
              <div className="text-xs">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-gray-400">Sent you a message</p>
              </div>
            </MessageInfo>
            <div className="flex justify-between">
              <div className="px-1 cursor-pointer">
                <CallIcon />
              </div>
              <div className="px-1 cursor-pointer">
                <VideoCallIcon />
              </div>
              <div className="px-1 cursor-pointer">
                <InfoIcon />
              </div>
            </div>
          </div>

          <div className="p-2 pb-4 overflow-y-scroll h-3/4">
            {showMessages &&
              showMessages.map((curr,index) => {
                return (
                  <div
                    className={`${
                      curr.author === currentUser
                        ? "border px-2 rounded-xl w-1/2 p-2 break-all mb-2 bg-gradient-to-r from-pink-400 to-purple-500"
                        : "text-gray-50 border px-2 rounded-xl ml-auto w-1/2 bg-gradient-to-r from-purple-400 to-pink-500 p-2 break-all mb-2 "
                    }`}
                    key={index}
                  >
                    <p>{curr.message}</p>
                    <span>{curr.time}</span>
                  </div>
                );
              })}
              {typing && <p className='messages_typing'>typing....</p>}
            {/* <RecievedMessage
                        showMessages={showMessages}/>  */}
          </div>
         
         <div className="absolute bottom-0 w-full py-2 px-3">
          <div className="flex rounded-md border border-gray-200 bg-gray-100 py-2 ">
            <input
              type="text"
              className="outline-none border-none w-full bg-transparent text-sm pl-2"
              placeholder="Write a messsage"
              value={message}
              onChange={getMessagesValues}
              onKeyDown={()=>(socket.emit('typing',(room)))}
              onKeyUp={()=>(socket.emit('stoptyping',(room)))}
          
            />
            {console.log("ddd", send) || send ? (
              <>
                <div className={"animation1"} onClick={sendPing}>
                  <SendIcon style={{ marginRight: 5 }} />
                </div>
              </>
            ) : (
              <>
                <div className="flex animation2">
                  <PhotoLibraryIcon style={{ marginRight: 10 }} />
                  <FavoriteBorderIcon style={{ marginRight: 10 }} />
                </div>
              </>
            )}
          </div>
          </div></>:<>
            <div className='flex flex-col text-center m-0 absolute top-1/3 empty_message'>
              <div className="mb-1.5">
                {/* <img src={} alt='Icon'/>
                 */}
                 <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.47 122.88" className='w-20 inline'>
<defs>
{/* <style>.cls-1{fill-rule:evenodd}
</style> */}
</defs>
<title>instant-response</title>
<path class="cls-1"
 d="M17.2,0H79.49a17.24,17.24,0,0,1,17.2,17.2V55.55a17.24,17.24,0,0,1-17.2,17.2H46.92L20.81,95.2A2.9,2.9,0,0,1,16,93c0-.07,0-.15,0-.22l1.39-20.07H17.2A17.24,17.24,0,0,1,0,55.55V17.2A17.24,17.24,0,0,1,17.2,0ZM45.27,40.55l-11.78-1.1L45.56,15.76H58.91L49,30.33l13.62,1.51-25,30,7.61-21.3ZM106.79,28a16.91,16.91,0,0,1,13.68,16.55V82.88a16.88,16.88,0,0,1-16.85,16.85H103l1.42,20.45h0a.86.86,0,0,1,0,.16,2.54,2.54,0,0,1-2.54,2.54,2.51,2.51,0,0,1-1.65-.61L74,99.07H39.49l17-17.3h36a14.34,14.34,0,0,0,14.3-14.3V28ZM79.48,5.8H17.2A11.43,11.43,0,0,0,5.8,17.2V55.55h0A11.44,11.44,0,0,0,17.2,67h3.53a2.91,2.91,0,0,1,2.7,2.9c0,.06,0,.12,0,.18L22.29,86.31,43.83,67.79a2.88,2.88,0,0,1,2-.84H79.48a11.43,11.43,0,0,0,11.4-11.4V17.2A11.43,11.43,0,0,0,79.48,5.8Z"/>
</svg>
              </div>
              <div className="font-normal ... text-2xl mb-1.5"><h1>Your Messages</h1></div>
              <div className="mb-2.5 text-gray-400"><p>Send private photos and messages to a friend or group.</p></div>
              <div><button class="bg-sky-500 text-white py-1 px-2 rounded-md">Send Messages</button></div>
            </div>
          </> 

         }
        </RightItems>
      </div>
    </div>
  );
}

export default Message;
