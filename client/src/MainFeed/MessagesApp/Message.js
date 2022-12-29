import React, { useEffect, useState } from "react";
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
import SentMessages from "./SentMessages";
import RecievedMessage from "./RecievedMessage";

const socket = io.connect("http://localhost:3001");
console.log(socket);

// import {animate__slideOutRight} from 'react-animations/lib/animate__slideOutRight'

const LeftItems = tw.div` border-r-indigo-200 border-gray-800 basis-2/5 border-r`;
const Header = tw.div`border-b py-3 text-center h-14`;
const MessageInfo1 = tw.div`flex py-2 cursor-pointer pl-2`;
const MessageInfo = tw.div`flex py-1.5 cursor-pointer pl-2 items-center`;
const Right = tw.div``;
const ImageContainer = tw.div`pr-2`;
const MessagesName = tw.div``;
const RightItems = tw.div`basis-3/5`;

function Message() {
  const [send, setSend] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ profilePic: "", name: "" });
  const [room, setRoom] = useState([]);
  const [showMessages, setShowMessages] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [savedMessages,setSavedMessages] = useState([])

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
      console.log(res);
      setCurrentUser(res.data.userName);
    });

    Messages.getRoom(id, auth).then((res) => {
      console.log("getRoom", res);
      socket.emit("join_room", res.data[0].id);
      let room = res.data[0].id;
      setRoom(room);
      let data=res.data[0].messages
      console.log('data',data)
      setShowMessages(data);
      console.log("joined room", res.data[0].id);
    });

    Messages.getCurrentUserRoom(auth).then((res) => {
      console.log('Response',res)
    });

   
  }, []);

  // useEffect(() => {
   
  //   setTimeout(() => {
  //     console.log(room)
  //     Messages.getMessages(room).then((res) => {
  //       console.log(res)
  //     });
  //   }, 1000);
   

  // }, []);

  // console.log(user)

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    })

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    })
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      
    }
      
  }, [socket])

  console.log(room, auth, showMessages);

  const getMessagesValues = (e) => {
    let messageValue = e.target.value;
    setMessage(messageValue);
  
    if (messageValue.length > 0) {
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
    setMessage(null);
    let data={
      messageData:messageData
    }

    Messages.savedMessages(room, auth, data).then((res) => {
      console.log(room, auth, showMessages);
      console.log(res);
    });
  };
  

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      console.log(data);
      setShowMessages((list) => [...list, data]);
    });
  }, [socket]);
 
console.log(savedMessages);
  return (
    <div>
      <div className="flex border border-gray-100 bg-white ">
        <LeftItems>
          <Header>
            <p>{currentUser}</p>
          </Header>
          <MessageInfo1>
            <ImageContainer className="">
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrvOZf5zaHg_9a8upGltfVtObFu_0QH1rcw&usqp=CAU"
                alt="image"
              />
            </ImageContainer>
            <div className="text-xs">
              <p className="text-sm">{user.userName}</p>
              <p className="text-xs text-gray-400">Sent you a message</p>
            </div>
          </MessageInfo1>
        </LeftItems>

        <RightItems>
          <div className="border-b flex items-center justify-between px-2 h-14 ">
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

          <div className="m-1.5 pt-8">
            
            {
           showMessages && showMessages.map((curr)=>{
           return( <div className={`${curr.author===currentUser?'border px-2 rounded-xl w-1/2 p-2 break-all mb-2 bg-gradient-to-r from-pink-400 to-purple-500':'text-gray-50 border px-2 rounded-xl ml-auto w-1/2 bg-gradient-to-r from-purple-400 to-pink-500 p-2 break-all mb-2 '}` }>
           <p>{curr.message}</p><span>{curr.time}</span>
           </div>
            )
           })
          }
            {/* <RecievedMessage
                        showMessages={showMessages}/>  */}
          </div>

          <div className="flex m-1.5 sm:py-1 md:py-1 lg:py-2 rounded-md border border-gray-200 bg-gray-100 sticky bottom-0 w-11/12 px-1">
            <input
              type="text"
              className="outline-none border-none w-full bg-transparent text-sm pl-2"
              placeholder="Write a messsage"
              value={message}
              onChange={getMessagesValues}
            />
            {console.log('ddd',send)||send ? (
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
        </RightItems>
      </div>
    </div>
  );
}

export default Message;
