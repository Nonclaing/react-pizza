import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../templates/Base';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue, setSearchValue } = React.useContext(AppContext);

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  useEffect(() => {
    setIsLoading(true);
    console.log(currentPage);
    const urlParams = [
      { name: 'category', value: categoryId },
      { name: 'sortBy', value: sort?.sortBy },
      { name: 'order', value: sort?.sortOrder },
      { name: 'search', value: searchValue },
      { name: 'page', value: currentPage },
      { name: 'limit', value: 4 },
    ];

    const urlParamsString = urlParams
      .map(({ name, value }) => {
        return value ? `${name}=${value}&` : '';
      })
      .join('');

    axios
      .get(`https://65de266ddccfcd562f5665ae.mockapi.io/items?${urlParamsString}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [categoryId, sort, searchValue, currentPage]);

  const onChangePage = (number) => {
    dispatch(setCurrentPageCount(number));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map(({ id, title, price, imageUrl, sizes, types }) => {
              return (
                <PizzaBlock
                  key={id}
                  title={title}
                  price={price}
                  imageUrl={imageUrl}
                  sizes={sizes}
                  types={types}
                />
              );
            })}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
