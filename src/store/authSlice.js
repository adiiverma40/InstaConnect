import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null ,
    status : false ,
    username: '' ,
    bio:'' ,
    databaseId :''
}

export const AuthSlice = createSlice({
        name :'Auth' ,
        initialState,
      reducers: {
        login : (state , action) =>{
            state.userData = action.payload.userData
            state.status = true
        },
        logout: (state, action) =>{
            state.userData = null,
            state.status = false
        },
        userdetails : (state , action) => {
          state.username = action.payload.username
          state.bio = action.payload.bio
          state.databaseId = action.payload.id
        }
      }
})

export const {login , logout , userdetails} = AuthSlice.actions
export default AuthSlice.reducer