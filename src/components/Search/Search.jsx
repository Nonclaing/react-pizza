import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onChange = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log(str);
      dispatch(setSearchValue(str));
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
