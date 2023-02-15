
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io.connect('http://localhost:3001/');
const VideoCall=()=>{
  const localVideoRef=useRef()
  const remoteVideoRef=useRef()
  const textRef=useRef()
  const pc=useRef(new RTCPeerConnection(null))
  // const candidates=useRef([])

  const [offerVisible,setOfferVisible] =useState(true)
  const [answerVisible,setAnswerVisible]=useState(false)
  const [status,setStatus]=useState('Make a call now')

  
 

  useEffect(()=>{

    socket.on('connection-success',success=>{
      console.log(success)
    })

    socket.on('sdp',data=>{
      console.log(data)
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp))
      textRef.current.value=JSON.stringify(data.sdp)
        if(data.sdp.type==='offer'){
          setOfferVisible(false)
          setAnswerVisible(true)
          setStatus('Incoming Call .....')
        }else{
          setStatus('Call Established')
        }

    })


    socket.on('candidate',candidate=>{
      console.log(candidate)
      // candidates.current=[...candidates.current,candidate]
      pc.current.addIceCandidate(new RTCIceCandidate(candidate))


    })


    const constraints={
      video:true,
      audio:true,
      
    }
    navigator.mediaDevices.getUserMedia(constraints)
    .then((currentStream)=>{
     localVideoRef.current.srcObject=currentStream
     currentStream.getTracks().forEach(track=>{
       _pc.addTrack(track,currentStream)
       console.log(track,currentStream)
     })
    }).catch(e=>{
      console.log(e)
    })


    const _pc=new RTCPeerConnection(null)

    _pc.onicecandidate=(e)=>{
     
     if(e.candidate){
      
      console.log('e',JSON.stringify(e.candidate))
      sendToPeer('candidate',e.candidate)
     }
    }

     _pc.oniceconnectionstatechnage=(e)=>{
      console.log(e)
     }
  
     _pc.ontrack=(e)=>{
      console.log('Ontrack',e)
      remoteVideoRef.current.srcObject=e.streams[0]
       }
       pc.current=_pc
    
    
   
  },[])


  const sendToPeer=(eventType,payload)=>{
     socket.emit(eventType,payload)
  }
  const processSDP=(sdp)=>{
    console.log(JSON.stringify(sdp))
    pc.current.setLocalDescription(sdp)
    socket.emit('sdp',{
      sdp,
    })
    sendToPeer('sdp',{sdp})
  }


  const createOffer=()=>{
    pc.current.createOffer({
      offerToReceiveAudio:1,
      offerToReceiveVideo:1,
    }).then(sdp=>{
      processSDP(sdp)
      setOfferVisible(false)
      setStatus('CAllinng')
    }).catch(e=>console.log(e))
  }

  const createAnswer=()=>{
    pc.current.createAnswer({
      offerToReceiveAudio:1,
      offerToReceiveVideo:1,
    }).then(sdp=>{
      processSDP(sdp)
      setAnswerVisible(false)
      setStatus('Call Established')
    }).catch(e=>console.log(e))
  }
   


  // const setRemoteDescription=()=>{
    
  //  const sdp=JSON.parse(textRef.current.value)
  //  console.log('sdp')
   
  //  console.log(textRef.current.value)
  //  alert(textRef.current.value)
  //  pc.current.setRemoteDescription(new RTCSessionDescription(sdp))
  // }


  // const addCandidate=()=>{
  //   const candidate=JSON.parse(textRef.current.value)
  //   console.log('Adding cadidate',candidate);
  //   candidates.current.forEach(candidate=>{
  //     console.log(candidate)
  //     pc.current.addIceCandidate(new RTCIceCandidate(candidate))
  //   })
  // }

  const showHideButton=()=>{
    if(offerVisible){
      return (
       <div>
         <button onClick={createOffer}>Call</button>
       </div>
      )
    }
   else if(answerVisible){
        return (
         <div>
           <button onClick={createAnswer}>Answer</button>
         </div>
        )
    }
   }
  const getUserMedia=()=>{
  console.log('HEllo')
  }
return (
  <>
  <button onClick={getUserMedia}>Get User Media</button>
  <div className="flex">
  <div>
  <video autoPlay ref={localVideoRef}></video>
  <video autoPlay ref={remoteVideoRef}></video>
  </div>
  <div>
  {/* <button onClick={createOffer}>Create Offer</button><br/>
  <button onClick={createAnswer}>Create Answer</button><br/>
    */}
    {showHideButton()}
    <div>{status}</div>
  <textarea ref={textRef}>Please Enter Text</textarea>
  {/* <button onClick={setRemoteDescription}>Set Remote Description</button><br/> */}
  {/* <button onClick={addCandidate}>Add Candidates</button><br/> */}
</div>
</div>
  </>
)

}

export default VideoCall