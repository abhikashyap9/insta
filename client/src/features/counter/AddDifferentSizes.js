// import {configureStore,createSlice} from '@reduxjs/toolkit'

// const initialState={
//     value:0
// }

// const differentSizes=createSlice({
    
//     name:'sizes',
//     initialState,
//     reducers:{
//       home:(state,action)=>{
//         state.value++
//         alert('Main ni nto kon be')
//       },
//       search:(state,action)=>{
//         state.value--
//       },
//       messages:(state)=>{
//         state.value++
//       },
//       notifications:(state)=>{
//         state.value--
//       },
//       addimages:(state)=>{
//         state.value+=1
//       },
//       incrementByAmount:(state,action)=>{
//         state.value+=action.payload
//       }}
// })

// export const actions=differentSizes.actions
// export const store =configureStore({
//   reducer:differentSizes.reducer
// })
import {configureStore,createSlice} from '@reduxjs/toolkit'

const counterSlice=createSlice({
    name:'counter',
    initialState:{counter:0},
    reducers:{
        increment(state,action){
            state.counter++
            alert('Hui')
        },
        decrement(state,action){
            state.counter--
        },
        addBy(state,action){
            state.counter+=action.payload
        }
    }

})
export const actions=counterSlice.actions;
export const store =configureStore({
    reducer:counterSlice.reducer
})
// export default store