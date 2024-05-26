import UploadImage from '../../image/2765820.jpg'
import tw from 'tailwind-styled-components'
import '../../App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { CiLocationOn } from "react-icons/ci";

// !DjsXUiD$4D7aw4
const Container = tw.div`
flex
flex-col
mx-auto 
justify-center
cursor-pointer
py-5
`

const UploadImages = tw.div`
w-2/5
mx-auto`

const DragPhotos = tw.div`
py-2
text-center`

const UploadPics = tw.div`
text-center
py-2`

const CropPage = tw.div`
lg:w-full
sm:w-80
xs:w-80
md:w-80
h-40
mx-auto`

const ShareContainer = tw.div`
flex`

const ImagesContainer = tw.div`
bas
lg:w-72
sm:w-80
xs:w-80
md:w-80
h-40
border-r`

const ShareOptionContainer = tw.div`
w-full
lg:px-2`

const ProfilePictureContainer = tw.div`
py-4`

const LocationConatiner = tw.div`
border-t
border-b 
border-gray-200 
relative`

const LocationIcons = tw.div`
absolute
top-1 
right-0`

const DragText = tw.div`
lg:text-2xl
md:text-lg 
sm:text-lg
font-light`

const UploadButton = tw.button`
bg-sky-500
px-2
py-1
rounded-sm
w-1/2
text-white`

const CropOption = (props) => {
  const {
    handleClick,
    inputRef,
    onSelectFile,
    selectedImages,
    capPage,
    getLocationValues,
    cityName,
    cityNames,
    handleCaption,
    formValue,
  } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  function deleteHandler(image) {
    // console.log(image)
  }

  const multipleCarousel = () => {
    return
  }

  return (
    <>
      <Container
        className={`${
          capPage === false && selectedImages.length > 0 ? `py-0` : ''
        }`}
      >
        {capPage === false && selectedImages.length > 0 ? (
          <>
            <CropPage className="">
              <Carousel
                className={`${
                  capPage === false && selectedImages.length > 0 ? `mt-24` : ''
                }`}
              >
                {selectedImages.map((image, index) => {
                  return (
                    <div key={image} className="image object-contain mx-auto">
                      <img
                        src={image}
                        alt="upload"
                        className="sm:w-96 md:w-90 lg:w-full h-96 mx-auto object-cover"
                        onChange={() => deleteHandler(image)}
                      />
                      {/* <button onClick={() => deleteHandler(image)}>
            Crop
          </button> */}
                    </div>
                  )
                })}
              </Carousel>
            </CropPage>
          </>
        ) : capPage === true && selectedImages.length > 0 ? (
          <>
            <ShareContainer>
              <ImagesContainer className="mt-20">
                {/* <Slider {...settings}>{multipleCarousel()}</Slider> */}
                <Carousel
                  className={`${
                    capPage === false && selectedImages.length > 0
                      ? `mt-24`
                      : ''
                  }`}
                >
                  {selectedImages.map((image, index) => {
                    return (
                      <div key={image} className="image object-contain mx-auto">
                        <img
                          src={image}
                          alt="upload"
                          className="sm:w-96 md:w-90 lg:w-full h-96 mx-auto object-cover"
                          onChange={() => deleteHandler(image)}
                        />
                        {/* <button onClick={() => deleteHandler(image)}>
            Crop
          </button> */}
                      </div>
                    )
                  })}
                </Carousel>
              </ImagesContainer>
              <ShareOptionContainer>
                <ProfilePictureContainer>ProfileName</ProfilePictureContainer>
                <div>
                  <textarea
                    className="border-none outline-none h-60 resize-none"
                    placeholder="Add a caption...."
                    onChange={handleCaption}
                  ></textarea>
                </div>
                <LocationConatiner>
                  <LocationIcons>
                    <CiLocationOn />
                  </LocationIcons>
                  <input
                    className="input-field py-2 outline-none border-none break-all px-2 w-11/12"
                    placeholder="Location"
                    type="text"
                    onChange={getLocationValues}
                    value={formValue}
                  />
                  {cityName.length > 0 ? (
                    <div className="bg-white px-2">
                      <ul className="">
                        {cityName?.map((curr, index) => (
                          <li
                            onClick={() => cityNames(curr)}
                            className="border-b border-gray-200 p-1"
                          >
                            {curr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                </LocationConatiner>
              </ShareOptionContainer>
            </ShareContainer>
          </>
        ) : (
          <>
            <UploadImages>
              <img src={UploadImage} alt="Upload Images" />
            </UploadImages>
            <DragPhotos>
              <DragText>Drag Photos and Videos Here</DragText>
            </DragPhotos>
            <UploadPics>
              <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={onSelectFile}
                multiple
                accept="image/png , image/jpeg, image/webp"
              />
              <UploadButton onClick={handleClick}>Click TO Upload</UploadButton>
            </UploadPics>
          </>
        )}
      </Container>
    </>
  )
}

export default CropOption
