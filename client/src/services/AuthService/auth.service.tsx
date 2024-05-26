import axios from "axios";
const baseUrl='http://localhost:3001/'

const signUp = (values)=>{
    let url=baseUrl+'/signup';
    return axios.post(url,values)
}

const login= (values)=>{
    let url=baseUrl+'/login';
    return axios.post(url,values)
}

const forgotPassword=(email)=>{
    let url=baseUrl+`/resetEmail/${email}`
    return axios.get(url)
}

const resetEmailPassword=(token,data)=>{
    console.log(token,data)
    let url=baseUrl+`/resetPassword?token=${token}`
    return axios.post(url,data)
}

const Auth={
    signUp,login,forgotPassword,resetEmailPassword
}
export default  Auth;