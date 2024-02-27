import { useState } from 'react';

function Categories() {
  const [active, setActive] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickHandler = (idx) => setActive(idx);

  return (
    <div className='categories'>
      <ul>
        {categories.map((text, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onClickHandler(idx)}
              className={active === idx ? 'active' : ''}>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
