import Header from '../components/Header/Header';

function Base({ children }) {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>{children}</div>
      </div>
    </div>
  );
}

export default Base;
