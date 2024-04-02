import './scss/app.scss';
import { Outlet } from 'react-router-dom';
import Base from './templates/Base';

function App() {
  return (
    <Base>
      <Outlet />
    </Base>
  );
}

export default App;
