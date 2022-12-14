import axios from "axios";

const baseUrl='http://localhost:3002'

const userGet =(auth)=>{
    let url = baseUrl + '/userprofile/i';
    return axios.get(url,{headers:{'Authorization': `Bearer ${auth}`}})
}

const userImage =(auth)=>{
    let url = baseUrl + '/profileimage';
    return axios.get(url,{headers:{'Authorization': `Bearer ${auth}`}})
}

const getUserById = (id)=>{
    let url = baseUrl +`/otherprofile/${id}`;
    return axios.get(url)
}
const userFollow =(id,auth)=>{
    let url =baseUrl + `/follow/${id}`;
    return axios.put(url,{},{headers:{'Authorization': `Bearer ${auth}`}});
}

const userUnfollow =(id,auth)=>{
    let url = baseUrl + `/unfollow/${id}`;
    return axios.put(url,{},{headers:{'Authorization': `Bearer ${auth}`}});
}

const UserProfile={
    userGet,userImage,getUserById,userFollow,userUnfollow
}
export default  UserProfile;