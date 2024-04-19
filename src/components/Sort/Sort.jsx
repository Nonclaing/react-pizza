import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortValue } from '../../redux/slices/filterSlice';

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const popupOnClick = (sortItem) => {
    setOpen(false);
    dispatch(setSortValue(sortItem));
  };

  const outSideClick = (event) => {
    if (!event.composedPath().includes(sortRef.current)) {
      setOpen(false);
      console.log('1');
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', outSideClick);

    return () => {
      document.body.removeEventListener('click', outSideClick);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.text}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {list.map((sortItem) => {
              return (
                <li
                  key={sortItem.id}
                  onClick={() => popupOnClick(sortItem)}
                  className={sort.id === sortItem.id ? 'active' : ''}>
                  {sortItem.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
export const list = [
  {
    id: 0,
    text: 'популярности (воз.)',
    sortBy: 'rating',
    sortOrder: 'ask',
  },
  {
    id: 1,
    text: 'популярности (убыв.)',
    sortBy: 'rating',
    sortOrder: 'desc',
  },
  {
    id: 2,
    text: 'цене  (воз.)',
    sortBy: 'price',
    sortOrder: 'ask',
  },
  {
    id: 3,
    text: 'цене (убыв.)',
    sortBy: 'price',
    sortOrder: 'desc',
  },
  {
    id: 5,
    text: 'алфавиту  (воз.)',
    sortBy: 'title',
    sortOrder: 'ask',
  },
  {
    id: 6,
    text: 'алфавиту (убыв.)',
    sortBy: 'title',
    sortOrder: 'desc',
  },
];
