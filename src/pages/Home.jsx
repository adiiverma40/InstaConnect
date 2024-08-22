import React, { useEffect } from 'react';
import { LeftMenu } from '../Components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const selector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(selector.status) return 
    else navigate('/')
  } , [navigate  , selector.status , selector.userData])

  return (
    <div className='flex'>
      <LeftMenu/>
      Home
    </div>
  );
}

export default Home;