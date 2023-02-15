// import RegistrationsForm from "./LoginAuth/SignUpForm.js";
import './App.css';
import { Route,Routes } from "react-router-dom";
import MainFeedIndex from "../src/MainFeed/MainFeedIndex";
import Signup from "../src/LoginAuth/Signup";
import LoginAuth from "../src/LoginAuth/LoginAuth.js";
import Profile from '../src/MainFeed/Profile/Profile';
import Explore from '../src/MainFeed/Explore/Explore';
import AddImages from '../src/MainFeed/Add Images/AddImages';
import Notification from '../src/MainFeed/Notification/Notification.js';
import Message from '../src/MainFeed/MessagesApp/Message';
import Feed from './MainFeed/Feed/Feed';
import OtherProfile from './MainFeed/Profile/OtherProfile';
import CropOption from './CropOption'
// import Notification from '../src/MainFeed/Notification/Notification';
// import { Explore } from '@material-ui/icons';
// import AddImages from './MainFeed/Add Images/AddImages';


function App() {

  return (

    <>
          
     
      
      {/* <Route path="/MainFeedIndex/Profile" element={<Profile/>} />
      {/* <Route path="/MainFeedIndex" element={<MainFeedIndex/>} /> */}
      {/* <MainFeedIndex/> */}


      <Routes>
      <Route path="/Signup" element={<Signup/> } /> 
      <Route path="/LoginAuth" element={<LoginAuth />} />
            <Route path="/" element={<MainFeedIndex />} >

              <Route index element={<Feed />} />
              <Route exact path="profile" element={<Profile />} />
              <Route path="profile/:id" element={<OtherProfile />} />
              <Route path='crop' element={<CropOption/>}/>
              <Route path="explore" element={<Explore />} />
              <Route path="addimages" element={<AddImages />} />
              <Route path="notification" element={<Notification />} />
              <Route path="message/:id" element={<Message/>} />
              <Route path="message" element={<Message/>} />
                  
              </Route>
              <Route>
                <Route></Route>
              </Route>
          </Routes>
      {/* <Routes>
            <Route path="/" element={<Feed />} > */}
              {/* <Route path="mainfeed" element={<Feed />} /> */}
              {/* <Route path="profile" element={<Profile />} />
              <Route path="explore" element={<Explore />} />
              <Route path="addimages" element={<AddImages />} />
              <Route path="notification" element={<Notification />} />
              <Route path="message" element={<Message />} />

              </Route> */}
          {/* </Routes> */}
      {/* <Route path="/" element={} >
      <Route path="mainfeed" element={<Feed/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="explore" element={<Explore/>} />
      <Route path="addimages" element={<AddImages/>} />
      <Route path="notification" element={<Notification/>}/>
      <Route path="message" element={<Message/>} />
      <Route path="Signup" element={<Signup/> } /> 
      <Route path="LoginAuth" element={<LoginAuth />} />
      {/* </Route> */} 
      
      
    {/* </Routes> */}
    </>
  
  );
}

export default App;
