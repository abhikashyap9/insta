import axios from "axios";
const baseUrl = "http://localhost:3001";

const addVideo = (formData, auth) => {
  let url = baseUrl + "/singleVideo";
  return axios.post(url, formData, {
    headers: { Authorization: `Bearer ${auth}` },
  });
};

const getStories = (auth) => {
  let url = baseUrl + `/getAllStories`;
  return axios.get(url, { headers: { Authorization: `Bearer ${auth}` } });
};

// const postVideo=async(formdata,auth)=>{
//     console.log('services',formdata)
//     let url=baseUrl+'/singleVideo'
//     let response=await axios.post(url,formdata,{headers:{'Authorization':`Bearer ${auth}`}})
//     return response

// }

const Video = { addVideo, getStories };
export default Video;
