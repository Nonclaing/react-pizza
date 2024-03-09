import Header from '../components/Header/Header';

function Base({ children }) {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  );
}

export default Base;
