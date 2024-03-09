function Categories({ value, changeCallback }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className='categories'>
      <ul>
        {categories.map((text, idx) => {
          return (
            <li
              key={idx}
              onClick={() => changeCallback(idx)}
              className={value === idx ? 'active' : ''}>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
