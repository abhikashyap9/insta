import axios from "axios";
const baseUrl='http://localhost:3001'



const addSinglePost = (formData,auth)=>{
    console.log('res',auth)
    let url=baseUrl+'/single';
    return axios.post(url,formData,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}

const addProfileImage=(formData,auth)=>{
    let url = baseUrl+'/profileimage'
    return axios.put(url,formData,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}

const userUpload=()=>{
    let url = baseUrl + '/userpost';
    return axios.get(url)
}

const addLike=(auth,id)=>{
    let url =baseUrl +`/likedby/${id}`;
    return axios.put(url,{},{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}
const removeLike=(auth,id)=>{
    let url =baseUrl +`/unlikedby/${id}`;
    return axios.put(url,{},{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}

const addComment=(auth,postId,data)=>{
    console.log(postId)
    let url =baseUrl+`/addcomment/${postId}`;
    return axios.put(url,data,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}
const addReply=(auth,commentId,data)=>{
    // console.log(postId)
    console.log('Helloo',commentId,data)
    let url =baseUrl+`/addCommentReply/${commentId}`;
    return axios.put(url,data,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}

const deleteComment=(auth,commentId,postId)=>{
    // // console.log(postId) 
    // console.log('Helloo',commentId,data)
    let url =baseUrl+`/deleteComment/${commentId}?postId=${postId}`;
    return axios.delete(url,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}
const deleteCommentReply=(auth,replyId)=>{
    // // console.log(postId) 
    // console.log('Helloo',commentId,data)
    let url =baseUrl+`/deleteCommentReply/${replyId}`;
    return axios.delete(url,{
        headers: {
          'Authorization': `Bearer ${auth}` 
        }
    })
}

const AddPosts={
    addComment,addLike,addSinglePost,userUpload,addProfileImage,removeLike,addReply,deleteComment,deleteCommentReply
}
export default AddPosts;
