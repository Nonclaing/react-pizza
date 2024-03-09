import './scss/app.scss';

import { Outlet, redirect } from 'react-router-dom';
import Base from './templates/Base';

function App() {
  return (
    <Base>
      <Outlet />
    </Base>
  );
}

export default App;
