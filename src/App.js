import './scss/app.scss';
import { Outlet, redirect } from 'react-router-dom';
import Base from './templates/Base';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  console.log(searchValue);

  return (
    <Base searchValue={searchValue} setSearchValue={setSearchValue}>
      <Outlet />
    </Base>
  );
}

export default App;
