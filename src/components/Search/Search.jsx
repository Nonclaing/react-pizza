import styles from './Search.module.scss';
import { AppContext } from '../../templates/Base';
import React from 'react';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);

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
