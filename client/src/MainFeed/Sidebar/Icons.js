import React from 'react'
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components'
import { useMatchMedia } from "./useMediaMatch";

const Container=tw.div`
m-3
cursor-pointer
flex items-center
hover:bg-gradient-to-r from-purple-100 to-pink-100
rounded p-2 text-base`

const IconContainer = tw.div`
`
const IconInfo=tw.div`
lg:pl-4 font-normal
`


function Icons(props) {

  const isDesktopResolution = useMatchMedia("(min-width:992px)", true);

  const {  icon, iconinfo ,link,click } = props;
  
  return (
    <>
      <Link to={link} onClick={click}>       
        <Container >
        <IconContainer>{icon}</IconContainer>
        <IconInfo>{isDesktopResolution && (iconinfo)}</IconInfo>
        </Container>
        </Link>

    </>
  )
}

export default Icons