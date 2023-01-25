import React from 'react'
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Icons from './Icons';
import tw from 'tailwind-styled-components'
// import { Create } from '@material-ui/icons';

// width: 100%;
// bottom: 0;
// justify-content: space-around;
// left: 0;

const SidebarBox=tw.div`
flex
content-center
border-r
border-gray-300
bg-white
fixed
lg:z-10
sm:z-0

lg:flex-col
lg:h-screen
lg:w-56
lg:top-14
lg:justify-start


md:flex-row
md:w-full
md:bottom-0
md:left-0
md:justify-around 

sm:flex-row
sm:w-full
sm:bottom-0
sm:left-0
sm:justify-around 

xs:flex-row
xs:w-full
xs:bottom-0
xs:left-0
xs:justify-around 

`
function Sidebar(props) { 

  const {home,search,message,notification,addimages}=props;
  
  
  return (
    <SidebarBox>
         
          <Icons 
          // tab={home}
          click={home}
          icon={<HomeIcon style={{ fontSize: 24 }}/>}
          iconinfo="Feed"
          link={`/`}
          
          />
         
          <Icons
          //  tab={searchComponent}
           icon={<SearchIcon style={{ fontSize: 24 }}/>}
           iconinfo="Discover"
           link={`explore`}
           onClick={search}
           /> 

        <Icons
          //  tab={messages}
           icon={<MessageIcon style={{ fontSize:24 }}/>}
           iconinfo="Messages"
           link={`message`}
           onClick={message}
           />  
           
           <Icons
          //  tab={favIcon}
           icon={<FavoriteBorderIcon style={{ fontSize:24 }}/>}
           iconinfo="Notifications"
           link={`notification`}
           onClick={notification}
           /> 

           <Icons
          //  tab={addIcon}
           icon={<AddBoxIcon style={{ fontSize:24 }}/>}
           iconinfo="Create"
           link={`addimages`}
           onClick={addimages}
           />   
          
          
        </SidebarBox>
  )

}

export default Sidebar;