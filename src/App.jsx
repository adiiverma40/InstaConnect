import { useState } from 'react'

import Login from './pages/Login'
import { Outlet } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
