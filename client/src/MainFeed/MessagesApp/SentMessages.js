import React,{useEffect} from 'react'

function SentMessages(props) {

    const{showMessages}=props
    useEffect(() => {
        console.log('Rending',showMessages)
    
    }, [showMessages])
    
    
  return (
    <>{
         showMessages && showMessages.map((curr)=>{
        return( <div className='border px-2 rounded-xl w-1/2 p-2 break-all '>
        <p>{curr.message}</p><span>{curr.time}</span>
        </div>
        )
      })
      }
      </>
  )
}

export default SentMessages