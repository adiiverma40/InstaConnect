import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements ,Route,RouterProvider} from 'react-router-dom'
import {Login , SignUp, Home, Profile} from "./pages/index.js"
import EditProfile from './pages/EditProfile.jsx'


import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route index element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/edit' element={<EditProfile/>}/>
    </Route>
  )
)



createRoot(document.getElementById('root')).render(


  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
)
