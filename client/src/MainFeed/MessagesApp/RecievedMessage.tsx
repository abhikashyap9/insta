import React,{useEffect} from 'react'

function RecievedMessage(props) {

    const{showMessages}=props
    useEffect(() => {
        console.log('Rending',showMessages)
    
    }, [showMessages])
    
    
  return (
    <>{
         showMessages && showMessages.map((curr)=>{
        return( <div className='border px-2 rounded-xl ml-auto w-1/2 bg-gray-100 p-2 break-all'>
        <p>{curr.message}</p><span>{curr.time}</span>
        </div>
        )
      })
      }
      </>
  )
}

export default RecievedMessage