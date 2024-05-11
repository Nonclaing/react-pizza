import Header from '../components/Header/Header';
import React from 'react';

function Base({ children }) {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  );
}

export default Base;
