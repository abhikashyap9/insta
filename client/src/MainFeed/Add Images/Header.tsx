import React from 'react'
import tw from 'tailwind-styled-components'
const Container=tw.div`
border-b border-gray-200
`

const Icons=tw.div`
flex justify-between items-center px-3`

const IconsContainer=tw.div`font-medium text-base py-2`

function Header(props) {
    const { leftData,centerData,rightData,setCapPages }=props;
  return (
    <div>
    <Container>
    <Icons> 
     <IconsContainer>{leftData}</IconsContainer>
     <IconsContainer>{centerData}</IconsContainer>
    <IconsContainer><button className="text-sky-700 text-md" onClick={setCapPages}>{rightData}</button></IconsContainer>
    </Icons>
    </Container></div>
  )
}

export default Header