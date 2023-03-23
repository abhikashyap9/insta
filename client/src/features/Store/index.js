import {configureStore} from '@reduxjs/toolkit';
import storieReducer from '../Storie/storiesSlice';
import storyIndexReducer from '../Storie/indexSlice'
import currentStorieReducer from '../Storie/currentStorieSlice'
import currentUserReducer from '../LoginCredentials/userSlice'
import { createLogger } from 'redux-logger'

const logger = createLogger({
    // ...options
  });
   
  
export const store=configureStore({
    reducer:{
        storie:storieReducer,
        storieIndex:storyIndexReducer,
        currentStorie:currentStorieReducer,
        userData:currentUserReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),

})

export default store;