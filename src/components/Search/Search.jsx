import styles from './Search.module.scss';
import { AppContext } from '../../templates/Base';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const inputRef = useRef();

  const onChange = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  return (
    <div>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder={'Поиск пиццы'}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
