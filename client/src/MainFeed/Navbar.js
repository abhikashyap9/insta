import { React,useState } from 'react'
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components'
import '../App.css'

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
   const { instaLogo,searchBar,profile,setProfile,profileImage } = props;
   const [colorChange, setColorchange] = useState(false);
  
   const changeNavbarColor = () =>{
     if(window.scrollY >= 60){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };
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
            </NavPart2>
          
           
          <NavPart3 >
          <Link to={setProfile}> 
            <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src={`https://instaserver-26it.onrender.com/${profileImage}`}
            alt='image' />
            </Link>
            </NavPart3>
            
          </NavBox>
       </Nav>
    </>
  )
}

export default Navbar