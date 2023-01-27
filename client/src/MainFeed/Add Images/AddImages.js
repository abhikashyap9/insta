import React, { useState, useRef } from "react";
import tw from 'tailwind-styled-components'
import Header from './Header';
import CropOption from './CropOption';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPost from "../../services/addpost.service";
import { Country, State, City } from 'country-state-city';
import { useSelector, useDispatch } from 'react-redux'
let CountryName = Country.getAllCountries()
const StateName = State.getAllStates()



const MainContentBox = tw.div`w-full h-96`

function AddImages(props) {
  const { addImage, index } = props
  const [selectedImages, setSelectedImages] = useState([])
  const [capPage, setCapPage] = useState(false)
  const [formValue, setFormValue] = useState([]);
  const [cityName, setCityName] = useState([])
  const [captionValue, setCaptionValue] = useState([])
  const [imagesFiles,setImagesFiles]=useState([]);

  let centerCaption = capPage === false && selectedImages.length > 0 ? 'View' : capPage === true && selectedImages.length > 0 ? 'Share' : 'Create a New Post';
  let leftCaption   = capPage === false && selectedImages.length > 0 ? <ArrowBackIcon onClick={()=>setSelectedImages([])}/> : capPage === true && selectedImages.length > 0 ? <ArrowBackIcon onClick={()=>setCapPage(false)}/> : '';
  let rightCaption  = capPage === false && selectedImages.length > 0 ? 'Next' : capPage === true && selectedImages.length > 0 ? 'Share' : '';

  const handleClick = () => {
    inputRef.current.click();
  }
  const inputRef = useRef(null)
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    setImagesFiles(selectedFiles);
    let arr=[]
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      console.log('myFile',file)
      arr.push(file)
      return URL.createObjectURL(file);
    });
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImagesFiles(arr);
    // FOR BUG IN CHROME
    event.target.value = "";
  };
  
  const getLocationValues = (e) => {
    let getLocationValuess = e.target.value
    setFormValue(getLocationValuess)
    const text = getLocationValuess.trim().replace(/[\W_]+/g, '').charAt(0).toUpperCase() + getLocationValuess.slice(1)
    const a = CountryName.filter(name => name.name.includes(text))
    const b = StateName.filter(name => name.name.includes(text));

    let country = a.map(curr => curr.name)
    let state = b.map(curr => curr.name)
    let both = country.concat(state)
    let calcualtedArray= both.slice(0,5) 
    setCityName(calcualtedArray)
    
  }
  const cityNames = (curr) => {
    setFormValue(curr)
    setCityName([])
  }
  const handleCaption=(e)=>{
    setCaptionValue(e.target.value)
  }

  
  const sharePage=()=>{
   setCapPage(true)
   let image=imagesFiles[0];
   console.log(image);
   const formData = new FormData();
   let auth=localStorage.getItem("token")
   formData.append("image",image)
   formData.append("caption",captionValue)
   formData.append("location",formValue)

    if(rightCaption==='share')
    {
      AddPost.addSinglePost(formData,auth).then((res)=>{
            
    })
  }
    console.log(imagesFiles[0])
   
  }
 
  return (
    <div className="border border-gray-200 rounded-lg bg-white lg:w-full xs:w-full sm:w-full mt-5" onClick={addImage}>
      <Header
        leftData={leftCaption}
        centerData={centerCaption}
        rightData={rightCaption}
        setCapPages={sharePage}
      />
      <MainContentBox>
        <CropOption handleClick={handleClick}
          inputRef={inputRef}
          onSelectFile={onSelectFile}
          selectedImages={selectedImages}
          capPage={capPage}
          getLocationValues={getLocationValues}
          cityNames={cityNames}
          cityName={cityName}
          handleCaption={handleCaption}
          formValue={formValue}
        //   cityValues={cityName}
        //   formValue={formvalue}
        //   // getLocation={sendLocation}
        // // deleteHandler={deleteHandler}
        />
      </MainContentBox>

    </div>
  )
}

export default AddImages