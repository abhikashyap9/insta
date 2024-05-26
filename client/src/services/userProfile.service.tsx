import axios from "axios";

const baseUrl='http://localhost:3001'

const getUserById = (id)=>{
    let url = baseUrl +`/otherprofile/${id}`;
    return axios.get(url)
}
const userGet =(auth)=>{
    let url = baseUrl+'SignUpRoutes/userprofile';
    return axios.get(url,{headers:{'Authorization': `Bearer ${auth}`}})
}

const userImage =(auth)=>{
    let url = baseUrl + '/profileimage';
    return axios.get(url,{headers:{'Authorization': `Bearer ${auth}`}})
}

const userFollow =(id,auth)=>{
    let url =baseUrl + `SignUpRoutes/follow/${id}`;
    return axios.put(url,{},{headers:{'Authorization': `Bearer ${auth}`}});
}

const userUnfollow =(id,auth)=>{
    let url = baseUrl + `SignUpRoutes/unfollow/${id}`;
    return axios.put(url,{},{headers:{'Authorization': `Bearer ${auth}`}});
}

const searchUser=(search)=>{
    let url = baseUrl + `/searchUser?search=${search}`;
    return axios.get(url,{});
    
}

const userPosts =(auth)=>{
    let url = baseUrl+'/userPosts';
    return axios.get(url,{headers:{'Authorization': `Bearer ${auth}`}})
}
const otherUsersPosts =(id)=>{
    let url = baseUrl+`/otherUsersPosts/${id}`;
    return axios.get(url)
}
const UserProfile={
    userGet,userImage,getUserById,userFollow,userUnfollow,searchUser,userPosts,otherUsersPosts
}
export default  UserProfile;