import {createSlice} from '@reduxjs/toolkit';

const initialState={
    initialIndex:0
}

export const storyIndexSlice=createSlice({
    name:'storyIndex',
    initialState,
    reducers:{
        setInitialState:(state,action)=>{  
            state.initialIndex=action.payload
        },
        
    }
})

export default storyIndexSlice.reducer
export const {setInitialState}=storyIndexSlice.actions