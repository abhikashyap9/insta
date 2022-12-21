import axios from "axios";
const baseUrl='http://localhost:3001'

const signUp = (values)=>{
    let url=baseUrl+'/signup';
    return axios.post(url,values)
}

const login= (values)=>{
    let url=baseUrl+'/login';
    return axios.post(url,values)
}

const Auth={
    signUp,login
}
export default  Auth;