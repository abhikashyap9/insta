import {React,useState,useDeferredValue,Suspense} from 'react'
import UserProfile from '../../services/userProfile.service';
import MixedImages from './MixedImages';
import SearchIcon from './SearchIcon';
import DummyPic from '../../../src/image/dumyPic.svg.png';
import { Link } from 'react-router-dom';


function Explore() {
  const [value,setSearchValue]=useState('')
  const [searchResults,setSearchResults]=useState('')
  const [searchBox,setSearchBox]=useState(false)
  const defferedInput =useDeferredValue(value)
  let userId=localStorage.getItem("userid")

  const search=(e)=>{
    let input=e.target.value
    if(input.length>0){
      setSearchBox(true)
    }
    setSearchValue(input)
    if(defferedInput) {
      UserProfile.searchUser(defferedInput)
      .then(res=>{
        return res
      }).then(res=>{
        if(res.status===200){
          let data=res.data
          setSearchResults(data)
        }
      })
    }
    // showData()
  }

  // const showData=()=>{
  //   if(!defferedInput && searchResults.length>0){
  //     return (
  //         <>Loading...</>
  //     )
  // }
  // else{
  //     <>
     
  //     </>
  // }
  // }
  const navigateToProfile=(id)=>{
    console.log(id)


  }
  console.log(searchResults)
  return (
    <div className='border bg-white p-2'>
      <SearchIcon search={search}/>
     <Suspense fallback={<h2>Loading...</h2>}> 

    {searchBox? 
    <div className='relative'>
      <div className='h-auto w-full bg-white text-black absolute -top-1.5 z-10 rounded-md'>
      { value.length===0? <div className='text-right pr-2 cursor-pointer' onClick={()=>setSearchBox(false)}><p>x</p></div>:<></>}
       {
        Array.isArray(searchResults)&&searchResults.map((users,index)=>{
       return (
        <>
        <Link to={userId!==users.id?`../profile/${users.id}`:`/profile`}> 

        <div className='border-gray-400 py-2 cursor-pointer'  key={index}>
          <div className="flex items-center py-0.5 hover:bg-slate-100 rounded" >

          <div className="px-1">
          <div
            // className="flex"
                  // onClick={()=>showPhoto(index)}
                >
                  <img
            className="h-12 w-12 object-cover rounded-full"
            src={`${users.profilePicture.length>0?`http://localhost:3001/${users.profilePicture[0]}`:DummyPic}`}
            alt="stores"
          />
                </div>
            </div>
          
          <div>
          <p className='text-sm font-medium'>{users.userName}</p>
           <p className='text-sm text-slate-400'>{users.fullName} <span className='font-bold px-0.5'>.</span><span>{users.followers.length} followers</span></p>
          </div>
          </div>
        </div>
        </Link>
        {/* <p>{users.userName}</p> */}

        </>
       )
       
         })
        }
      </div>
      </div>:<></>
      }
      </Suspense> 

      <MixedImages/>
    </div>
  )

}

export default Explore