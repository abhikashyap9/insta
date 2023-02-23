import React, { useEffect, useState, useRef,Component } from "react";
import Storiess from "../Stories/Stories.js";
import Posts from "./Posts";
import AddPost from "../../services/addpost.service";
import Footer from "../Footer/Footer.js";
import { useMatchMedia } from "../Sidebar/useMediaMatch.js";
import AddPosts from "../../services/addpost.service";
import UserProfile from "../../services/userProfile.service.js";
import auth from "../../LoginAuth/auth.js";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "../../App.css";
import './Feed.css'
import Video from "../../services/video.service.js";
import CardNew from "./CardNew.js";
import { v4 as uuidv4 } from "uuid";
import Carousel from 'react-spring-3d-carousel';
import Carroussel from "./Carousels.js";
import Content from './Content'
let ffmpeg; //Store the ffmpeg instance


function Feed(props) {
  const { name } = props;
  console.log("props", props);
  const [userPost, setUserPost] = useState([]);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoFileValue, setVideoFileValue] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [videoTrimmedUrl, setVideoTrimmedUrl] = useState("");
  const [videos, setVideos] = useState("");
  const [isshowStorie, setisShowStorie] = useState(false);
  const [isStories, setIsStories] = useState(false);
  const [allStories, setAllStories] = useState([]);
  const videoRef = useRef();
  let initialSliderValue = 0;
 
  let cards = [
    {
      key: uuidv4(),
      content: <Content/>
    },
    {
      key: uuidv4(),
      content: <Content/>
    },
    {
      key: uuidv4(),
      content: <Content/>
  

    },
    {
      key: uuidv4(),
      content:<Content/>  },
    {
      key: uuidv4(),
      content:<Content/>
    },
    {
      key: uuidv4(),
      content: <Content/>
    },
    {
      key: uuidv4(),
      content: <Content/>
    }
  ];
  const convertToHHMMSS = (val) => {
    const secNum = parseInt(val, 10);
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - hours * 3600) / 60);
    let seconds = secNum - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let time;
    // only mm:ss
    if (hours === "00") {
      time = minutes + ":" + seconds;
    } else {
      time = hours + ":" + minutes + ":" + seconds;
    }
    return time;
  };

  useEffect(() => {
    //Load the ffmpeg script
    loadScript(
      "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.2/dist/ffmpeg.min.js"
    ).then(() => {
      if (typeof window !== "undefined") {
        // creates a ffmpeg instance.
        ffmpeg = window.FFmpeg.createFFmpeg({ log: true });
        //Load ffmpeg.wasm-core script
        ffmpeg.load();
        //Set true that the script is loaded
        setIsScriptLoaded(true);
      }
    });
  }, []);

  //Get the duration of the video using videoRef
  useEffect(() => {
    if (videoRef && videoRef.current) {
      const currentVideo = videoRef.current;
      currentVideo.onloadedmetadata = () => {
        setVideoDuration(currentVideo.duration);
        console.log("currentVideo", currentVideo.duration);
        setEndTime(currentVideo.duration);
      };
    }
  }, [videoSrc]);
  

  //Called when handle of the nouislider is being dragged
  const updateOnSliderChange = (values, handle) => {
    setVideoTrimmedUrl("");
    let readValue;
    if (handle) {
      readValue = values[handle] | 0;
      if (endTime !== readValue) {
        setEndTime(readValue);
      }
    } else {
      readValue = values[handle] | 0;
      if (initialSliderValue !== readValue) {
        initialSliderValue = readValue;
        if (videoRef && videoRef.current) {
          videoRef.current.currentTime = readValue;
          setStartTime(readValue);
        }
      }
    }
  };

  //Play the video when the button is clicked
  const handlePlay = () => {
    if (videoRef && videoRef.current) {
      videoRef.current.play();
    }
  };

  //Pause the video when then the endTime matches the currentTime of the playing video
  const handlePauseVideo = (e) => {
    const currentTime = Math.floor(e.currentTarget.currentTime);

    if (currentTime === endTime) {
      e.currentTarget.pause();
    }
  };

  //Trim functionality of the video
  const handleTrim = async () => {
    if (isScriptLoaded) {
      const { name, type } = videoFileValue;
      //Write video to memory
      ffmpeg.FS(
        "writeFile",
        name,
        await window.FFmpeg.fetchFile(videoFileValue)
      );
      const videoFileType = type.split("/")[1];
      //Run the ffmpeg command to trim video
      await ffmpeg.run(
        "-i",
        name,
        "-ss",
        `${convertToHHMMSS(startTime)}`,
        "-to",
        `${convertToHHMMSS(endTime)}`,
        "-acodec",
        "copy",
        "-vcodec",
        "copy",
        `out.${videoFileType}`
      );
      //Convert data to url and store in videoTrimmedUrl state
      const data = ffmpeg.FS("readFile", `out.${videoFileType}`);
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: videoFileValue.type })
      );

      setVideoTrimmedUrl(url);
      console.log("videos", videos);

      console.log(url);
    }
  };

  const sliderRef = useRef();
  const loadScript = (src) => {
    return new Promise((onFulfilled, _) => {
      const script = document.createElement("script");
      let loaded;
      script.async = "async";
      script.defer = "defer";
      script.setAttribute("src", src);
      script.onreadystatechange = script.onload = () => {
        if (!loaded) {
          onFulfilled(script);
        }
        loaded = true;
      }
      script.onerror = function () {
        console.log("Script failed to load");
      }
      document.getElementsByTagName("head")[0].appendChild(script);
    })
  }

  const handleClick = (e) => {
    switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        console.log("double click");
        break;
      case 3:
        console.log("triple click");
        // setActive(true)
        break;
    }
  };

  useEffect(() => {
    AddPosts.userUpload().then((res) => {
      console.log(res);
      setUserPost(res.data);
    });
    UserProfile.userGet(auth).then((res) => {
      console.log("userGet", res);
      let data = res.data;
      let { isStorie } = data;
      if (isStorie) {
        setIsStories(true);
      } else {
        setIsStories(false);
      }
      let profilePicture = data.profilePicture;
      let setProfile = profilePicture[0];
      setCurrentUser(setProfile);
    });
  }, [like]);
  console.log("current", currentUser);
  let userId = localStorage.getItem("userid");
  const handleLikeClicks = (e) => {
    let like = userPost.find((curr) => curr.id === e);
    if (like.likedBy?.includes(userId)) {
      AddPosts.removeLike(auth, e).then((res) => {
        console.log(res);
        setLike(Math.random() * 5);
      });
    } else {
      AddPosts.addLike(auth, e).then((res) => {
        console.log("auth", res);
        setLike(Math.random() * 5);
      });
    }
  };

  const getCommentValues = (e) => {
    console.log(e.target.value);
    setCommentValue(e.target.value);
    setComment(e.target.value);
  };
  const share = (postId) => {
    let data = {
      comment: comment,
    };
    AddPost.addComment(auth, postId, data).then((res) => {
      console.log(res);
      setLike(Math.random() * 5);
      setCommentValue("");
    });
  };

  // console.log('userPost', userPost)
  console.log("userPost", userPost);
  const closeBox = () => {
    setIsOpen(false);
  };
  console.log(isOpen);

  console.log(isShow, isVideo);
  console.log(videoTrimmedUrl);
  const addPost = () => {
    if (isShow && !isVideo) {
      return (
        <>
          <div className="pb-12">
            <div className="text-white flex flex-col justify-between h-56">
              {/* .....logo and add access to camera and microphone.. */}
              <div className="">
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-center">
                    Allow access to your camera and microphone{" "}
                  </h1>
                </div>
              </div>
              {/* Post story reel */}
              <div className="flex">
                <div className="basis-2/5 px-4">
                  <div className="h-6 w-6 border-2 border-b-white rounded "></div>
                </div>

                <div className="cursor-pointer flex basis-3/5">
                  <p className="px-2">Story</p>
                  <p className="px-2" onClick={addReel}>
                    Reel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isVideo && !videoTrimmedUrl) {
      return (
        <>
          {videoSrc.length ? (
            <React.Fragment>
              {/* <video src={videoSrc} ref={videoRef} onTimeUpdate={handlePauseVideo}>
            <source src={videoSrc} type={videoFileValue.type} />
          </video> */}
              <br />
              <video
                src={videoSrc}
                ref={videoRef}
                onTimeUpdate={handlePauseVideo}
                className="w-2/4 m-auto"
              >
                <source src={videoSrc} type={videoFileValue.type} />
              </video>
              <Nouislider
                behaviour="tap-drag"
                step={1}
                margin={3}
                limit={60}
                range={{ min: 0, max: videoDuration || 2 }}
                start={[0, videoDuration || 2]}
                connect
                onUpdate={updateOnSliderChange}
                ref={sliderRef}
              />
              <div className="flex m-auto w-2/4 text-xs py-0.5 text font-semibold justify-between">
                <p className="text-white">{convertToHHMMSS(startTime)}</p>{" "}
                &nbsp; End duration:{" "}
                <p className="text-white">{convertToHHMMSS(endTime)}</p>
              </div>
              <br />
              <button onClick={handlePlay} className="text-white">
                Play
              </button>{" "}
              &nbsp;
              <button onClick={handleTrim} className="text-white">
                Trim
              </button>
              <br />
            </React.Fragment>
          ) : (
            ""
          )}
        </>
      );
    } else if (videoTrimmedUrl) {
      return (
        <>
          <button onClick={shareVideo} className="text-white">
            Share
          </button>
          <button className="text-white" onClick={handleBack}>
            BAck
          </button>
          <video className="w-2/4 m-auto" controls>
            <source src={videoTrimmedUrl} type={videoFileValue.type} />
          </video>
        </>
      );
    } else {
      return (
        <>
          <div
            className="relative bg-zinc-900 h-36 w-24"
            onClick={() => setisShow(true)}
          >
            <p className="text-white absolute bottom-0 p-1 text-sm font-medium">
              Camera
            </p>
          </div>
        </>
      );
    }
  };
  const handleBack = () => {
    setVideoTrimmedUrl("");
    setStartTime("00:00");
  };
  console.log(videoTrimmedUrl);
  const modal = () => {
    setIsOpen(true);
    setisShow(false);
  };
  const inputRef = useRef(null);

  const addReel = () => {
    console.log("hello");
    inputRef.current.click();
  };
  async function getDuration(file) {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const video = document.createElement("video");

      const source = document.createElement("source");
      source.src = url; //--> blob URL
      video.preload = "metadata";
      video.appendChild(source);
      video.onloadedmetadata = function () {
        resolve(video.duration);
      };
    });
  }
  const onSelectFile = async (event) => {
    let file = event.target.files;
    const videos = file[0];

    console.log("partonselectfile", typeof videos);

    const blobURL = URL.createObjectURL(videos);
    console.log(videos);

    const duration = await getDuration(videos);
    const durationRounded = Math.round(duration);
    if (durationRounded > 60) {
      alert("fileSize execedd");
      return;
    }
    if (Object.keys(file).length > 0) {
      setIsVideo(true);
      // alert('ok')
    }
    setVideos(videos);

    setVideoFileValue(videos);
    setVideoSrc(blobURL);
    console.log(Object.keys(event.target.files).length);
    event.target.value = "";
  };

  const shareVideo = () => {
    let formdata = new FormData();
    console.log("part1", videos);
    // console.log('part2',videos)
    formdata.append("video", videos);
    formdata.append("startTime", startTime);
    formdata.append("endTime", endTime);
    console.log('isStorie',isStories)
    if (isStories) {
      Video.putVideoStorie(formdata, auth)
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setLike(Math.random() * 2);
          }
        });
    }
    Video.addVideo(formdata, auth)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setLike(Math.random() * 2);
        }
      });

    // console.log(shareVideoResult)
  };

  useEffect(() => {
    Video.getStories(auth).then((res) => {
      console.log("RESPONSE OF VIDEOS", res);
      setAllStories(res.data);
    });
  }, []);

  const isDesktopResolution = useMatchMedia("(min-width:1024px)", true);

  return (
    <>
      {isOpen && (
        <ReactDialogBox
          closeBox={closeBox}
          modalWidth="50%"
          closeButtonColor="white"
          bodyBackgroundColor="black"
          bodyTextColor="black"
          bodyHeight="100%"
        >
          {addPost()}
          <div className="form-group">
            <label htmlFor="videos">Upload Videos</label>
            <input
              type="file"
              ref={inputRef}
              name="videos"
              id="videos"
              multiple
              className="form-control"
              style={{ display: "none" }}
              accept=".mp4, .mkv"
              onChange={onSelectFile}
            />
          </div>
          <div
            className="py-4 text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <h1>Cancel</h1>
          </div>
        </ReactDialogBox>
      )}

      {isshowStorie && (
        <ReactDialogBox
          closeBox={closeBox}
          modalWidth="100%"
          bodyHeight="100%"
        >
          

    <Carroussel
        cards={cards}
        height="500px"
        width="90%"
        margin="0 auto"
        offset={4}
        showArrows={false}
      /> 
        
        </ReactDialogBox>
      )}

      <div className="lg:w-4/5 sm:w-full flex justify-between">
        <div className="lg:basis-3/5 sm:w-full">
          <Storiess
            addStories={modal}
            showPhoto={() => setisShowStorie(true)}
            stories={allStories}
          />
          {userPost.length > 0 ? (
            userPost?.map((current, index) => {
              return (
                <Posts
                  name={current.userId.userName}
                  location={current.location}
                  userImages={current.image}
                  caption={current.caption}
                  userName={current.userId.userName}     
                  active={current.likedBy?.includes(userId) ? "active" : "notactive" }
                  handleLikeClicks={() => handleLikeClicks(current.id)}
                  key={current.id}
                  user={current.userId.id}
                  share={() => share(current.id)}
                  getCommentValues={getCommentValues}
                  showComments={current?.comment}
                  postProfile={current.userId?.profilePicture[0]}
                  setCommentValue={commentValue}
                  currentUserProfileImage={currentUser}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div>{isDesktopResolution && <Footer />}</div>
      </div>
    </>
  );
}

export default Feed;
