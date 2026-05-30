//While learning react-redux we have placed this file in separate folder named as features

//Once the Project Finished: handle the post from redux as well.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
status: false,
userData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    }
})

//exporting individual functionality 
export const {login, logout} = authSlice.actions


export default authSlice.reducer



// // store/authSlice.js - SIMPLE WORKING VERSION
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     status: false,
//     userData: null,
// }

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.status = true;
//             state.userData = action.payload;
//         },
//         logout: (state) => {
//             state.status = false;
//             state.userData = null;
//         },
//     }
// })

// export const { login, logout } = authSlice.actions
// export default authSlice.reducer