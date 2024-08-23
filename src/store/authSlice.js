import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null ,
    status : false ,
    username: '' ,
    bio:'' ,
    databaseId :'',
    profileImageId:'',
    profileImageUrl:''

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
            state.username = ''
            state.bio = ''
            state.databaseId=''
            state.profileImageId = ''
            state.profileImageUrl=''
        },
        userdetails : (state , action) => {
          state.username = action.payload.username
          state.bio = action.payload.bio
          state.databaseId = action.payload.id
        },
        profileImage : (state , action) =>{
          state.profileImageId = action.payload.profileImageId
          state.profileImageUrl = action.payload.profileImageUrl
        }
      }
})

export const {login ,profileImage, logout , userdetails} = AuthSlice.actions
export default AuthSlice.reducer