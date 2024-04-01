import Header from '../components/Header/Header';

function Base({ children, searchValue, setSearchValue }) {
  return (
    <div className='wrapper'>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='content'>{children}</div>
    </div>
  );
}

export default Base;
