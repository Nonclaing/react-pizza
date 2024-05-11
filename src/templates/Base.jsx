import Header from '../components/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Base() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

export default Base;
