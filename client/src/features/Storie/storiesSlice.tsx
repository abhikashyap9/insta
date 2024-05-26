import {createSlice} from '@reduxjs/toolkit'
// const createSlice frrequire('@reduxjs/toolkit').createSlice;

const initialState={
    isStorie:false,
    
}

export const storie=createSlice({
    name:'storie',
    initialState,
    reducers:{
     setStateTrue:(state)=>{
        state.isStorie=true
    },
    setStateFalse:(state)=>{
        console.log('stateFalse',state)
        state.isStorie=false
    },
   
    
}
    
})
export default storie.reducer;
export const {setStateTrue,setStateFalse} =storie.actions




