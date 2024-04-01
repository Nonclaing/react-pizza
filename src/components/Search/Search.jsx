import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      <input
        className={styles.input}
        placeholder={'Поиск пиццы'}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
