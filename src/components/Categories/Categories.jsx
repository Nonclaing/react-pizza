import { setCategoryId } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((text, idx) => {
          return (
            <li
              key={idx}
              onClick={() => dispatch(setCategoryId(idx))}
              className={categoryId === idx ? 'active' : ''}>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
