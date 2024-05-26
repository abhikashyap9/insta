import { useState } from 'react'
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { useSelector } from "react-redux";
import { Logout } from '@mui/icons-material';



const Nav = tw.div`
   bg:transparent
   h-80px
   ${props => props.thin? 'navbar colorChange': 'navbar'}
   /* Fix your navbar by using below two lines of code */
   sticky
   top-0
   /* Fix your navbar by using above two lines of code */
   z-50
   md:transition delay-700 duration-300 ease-in-out ...
   rounded-lg 
`;
//    @media screen and (max-width: 960px) {
//        transition: 0.8s all ease
//    }
// const Nav=tw.div`
// ${props => props.thin? 'navbar colorChange': 'navbar'}
// `

const NavBox=tw.div`
flex p-4 px-6`

const NavPart1=tw.div`
basis-1/4 cursor-pointer
`
const NavPart2=tw.div`
basis-1/2 cursor-pointer`

const NavPart3=tw.div`
basis-1/4 cursor-pointer text-center`

function Navbar(props) {
   const { instaLogo,searchBar,profile,setProfile,profileImage,newDiv } = props;
   const [colorChange, setColorchange] = useState(false);
   const [logout,setLogout]=useState(false)
   const currentUser=useSelector((state)=>state.userData)
   const {userName,userProfilePicture} = currentUser
  const navigate = useNavigate()

  
   const changeNavbarColor = () =>{
     if(window.scrollY >= 60){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };

  const Logout=()=>{
    navigate('/auth/signup')
    localStorage.clear()
  }
  window.addEventListener('scroll', changeNavbarColor);
    return (
    <>
       <Nav thin={colorChange}>
          <NavBox>  
            <NavPart1>
               {instaLogo}
            </NavPart1>
            
            <NavPart2>
              {searchBar}
              {newDiv}
            </NavPart2>
          
           
          <NavPart3 >
            <div className='flex justify-center items-center'>
            <div>
          <Link to={setProfile}> 
            <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src={`http://localhost:3001/${userProfilePicture}`}

            alt='image' />
            </Link>
            </div>

            <div className='text-base ml-2'><p >{userName}</p></div>
            <IoIosArrowDropdownCircle onClick={()=>setLogout(prev=>!prev)}/>
            {logout && <div className='relative'>
              <div className='w-14 h-8 bg-cyan-50 absolute border rounded logout_button' onClick={Logout}>
                <p className='p-0.5'>Logout</p>
              </div>
            </div>}
            
            </div>

            </NavPart3>
            
          </NavBox>
       </Nav>
    </>
  )
}

export default Navbar