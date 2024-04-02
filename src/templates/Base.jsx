import Header from '../components/Header/Header';
import React, { useState } from 'react';

export const AppContext = React.createContext({});

function Base({ children }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className='wrapper'>
        <Header />
        <div className='content'>{children}</div>
      </div>
    </AppContext.Provider>
  );
}

export default Base;
