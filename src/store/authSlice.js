import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null ,
    status : false ,
    username: '' ,
    name:'',
    bio:'' ,
    databaseId :'',
    profileImageId:'',
    profileImageUrl:'',
    viewUserId :"" ,
    isSearch : false
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
            state.name =""
        },
        userdetails : (state , action) => {
          state.username = action.payload.username
          state.bio = action.payload.bio
          state.name = action.payload.name
          state.databaseId = action.payload.id
        },
        profileImage : (state , action) =>{
          state.profileImageId = action.payload.profileImageId
          state.profileImageUrl = action.payload.profileImageUrl
        },
        viewUser : (state , action) =>{
          state.viewUserId = action.payload.viewUserId
        },
        toggleSearch : (state , action ) =>  {
            state.isSearch = action.payload.search
        }
      }
})

export const { toggleSearch ,login ,profileImage, logout , userdetails , viewUser} = AuthSlice.actions
export default AuthSlice.reducer