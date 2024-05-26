import { FaInstagram } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Icons from './Icons';
import tw from 'tailwind-styled-components'
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
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
          icon={<FaHome style={{ fontSize: 24 }}/>}
          iconinfo="Feed"
          link={`/`}
          
          />
         
          <Icons
          //  tab={searchComponent}
           icon={<CiSearch style={{ fontSize: 24 }}/>}
           iconinfo="Discover"
           link={`explore`}
           onClick={search}
           /> 

        <Icons
          //  tab={messages}
           icon={<FaRegMessage style={{ fontSize:24 }}/>}
           iconinfo="Messages"
           link={`message`}
           onClick={message}
           />  
           
           <Icons
          //  tab={favIcon}
           icon={<CiHeart style={{ fontSize:24 }}/>}
           iconinfo="Notifications"
           link={`notification`}
           onClick={notification}
           /> 

           <Icons
          //  tab={addIcon}
           icon={<IoIosAddCircleOutline style={{ fontSize:24 }}/>}
           iconinfo="Create"
           link={`addimages`}
           onClick={addimages}
           />   
          
          
        </SidebarBox>
  )

}

export default Sidebar;