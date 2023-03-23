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
const putVideoStorie= (formData, id) => {
  let url = baseUrl + `/putVideoStorie/${id}`;
  return axios.put(url, formData);
};

const postImageStorie=(formData,auth)=>{
  let url=baseUrl + `/singleImage`
  return axios.post(url,formData,{headers:{Authorization:`Bearer ${auth}`}})
}
const putImageStorie=(formData,id)=>{
  let url=baseUrl + `/singleImage/${id}`
  return axios.put(url,formData)
}
const Video = { addVideo,getStories,putVideoStorie,postImageStorie,putImageStorie };
export default Video;
