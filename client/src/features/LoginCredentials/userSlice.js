import {createSlice} from '@reduxjs/toolkit'

const initialState={
    userName:'',
    userProfilePicture:'',
    isStorie:false
}

export const createUserSlice=createSlice({
    name:'currentUser',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
           state.userName=action.payload.userName
           state.userProfilePicture=action.payload.userProfilePicture
           state.isStorie=action.payload.isStorie
        }
    }

})

export default createUserSlice.reducer
export const {setUserData}=createUserSlice.actions