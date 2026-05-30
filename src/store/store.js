import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,

        //TODO: Craete post: postSlice here so when we have to access post information so that application does not have to make frequent request to appwrite
    
    }
})