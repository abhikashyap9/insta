
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const VideoCall=()=>{
  const localVideoRef=useRef()
  const remoteVideoRef=useRef()
  const textRef=useRef()
  const pc=useRef(new RTCPeerConnection(null))

  useEffect(()=>{
   
  },[])


  const createOffer=()=>{

    socket.on('connection-success',success=>{
      console.log(success)
    })

    socket.on('sdp',data=>{
      console.log(data)
      textRef.current.value=JSON.stringify(data.sdp)
    })


    socket.on('candidate',data=>{
      console.log(data)
    })


    const constraints={
      video:true,
      audio:true,
      
    }
    navigator.mediaDevices.getUserMedia(constraints)
    .then((currentStream)=>{
     console.log(currentStream) 

     localVideoRef.current.srcObject=currentStream
     currentStream.getTracks().forEach(track=>{
       _pc.addTrack(track,currentStream)
       console.log(track,currentStream)
     })
    }).catch(e=>{
      console.log(e)
    })


    const _pc=new RTCPeerConnection(null)
    pc.onicecandidate=(e)=>{
     if(e.candidate){
      console.log(JSON.stringify(e.candidate))
      socket.emit('candidate',e.candidate)
     }
     _pc.oniceconnectionsstatechnage=(e)=>{
      console.log(e)
     }
  
     _pc.ontrack=(e)=>{
      remoteVideoRef.current.srcObject=e.streams[0]
       }
       pc.current=_pc
    }
    
    pc.current.createOffer({
      offerToRecieveAudio:1,
      offerToRecieveVideo:1,
    }).then(sdp=>{
      console.log(JSON.stringify(sdp))
      pc.current.setLocalDescription(sdp)
      socket.emit('sdp',{
        sdp,
      })
    }).catch(e=>console.log(e))
  }

  const createAnswer=()=>{
    pc.current.createAnswer({
      offerToRecieveAudio:1,
      offerToRecieveVideo:1,
    }).then(sdp=>{
      console.log(JSON.stringify(sdp))
      pc.current.setLocalDescription(sdp)
      socket.emit('sdp',{
        sdp,
      })
    }).catch(e=>console.log(e))
  }


  const setRemoteDescription=()=>{
    console.log(textRef.current.value)
   const sdp=JSON.parse(textRef.current.value)
   
   console.log(textRef.current.value)
   pc.current.setRemoteDescription(new RTCSessionDescription(sdp))
  }


  const addCandidate=()=>{
    const candidate=JSON.parse(textRef.current.value)
    console.log('Adding cadidate',candidate);
    pc.current.addIceCandidate(new RTCIceCandidate(candidate))
  }
  const getUserMedia=()=>{
  console.log('HEllo')
  }
return (
  <>
  <button onClick={getUserMedia}>Get User Media</button>
  <video autoPlay ref={localVideoRef}></video>
  <video autoPlay ref={remoteVideoRef}></video>

  <button onClick={createOffer}>Create Offer</button><br/>
  <button onClick={createAnswer}>Create Answer</button><br/>
   
  <textarea ref={textRef}>Please Enter Text</textarea>
  <button onClick={setRemoteDescription}>Set Remote Description</button><br/>
  <button onClick={addCandidate}>Add Candidates</button><br/>

  </>
)

}

export default VideoCall