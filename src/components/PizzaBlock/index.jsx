import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

function Index({ id, title, price, imageUrl, sizes, types }) {
  const typeNames = ['тонкое', 'традиционное'];

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();

  const increaseCount = () => {
    dispatch(addItem({ item: { id, title, price, imageUrl, sizes, types } }));
  };

  return (
    <div className='pizza-block' data-id={id}>
      <Link to={`/pizza/${id}`}>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' loading={'lazy'} />
      </Link>
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((typeId, idx) => {
            return (
              <li
                key={typeId}
                onClick={() => setActiveType(idx)}
                className={idx === activeType ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((val, idx) => {
            return (
              <li
                key={val}
                onClick={() => setActiveSize(idx)}
                className={idx === activeSize ? 'active' : ''}>
                {val} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button
          className='button button--outline button--add'
          data-testid='add'
          onClick={increaseCount}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {items[id]?.count && <i>{items[id].count}</i>}
        </button>
      </div>
    </div>
  );
}

export default Index;
