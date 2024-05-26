import {createSlice} from '@reduxjs/toolkit'


const initialState={
initialState:[]
}
export const currentStorieSlice=createSlice({
   name:'currentStorie',
   initialState,
   reducers:{
      setCurrentStorie:(state,action)=>{
        state.initialState=action.payload
      }
   }
})

export default currentStorieSlice.reducer
export const {setCurrentStorie}=currentStorieSlice.actions