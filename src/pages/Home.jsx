import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../templates/Base';

const Home = () => {
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortValue, setSortValue] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, sortCurrentPage] = useState(1);
  const { searchValue, setSearchValue } = React.useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const urlParams = [
      { name: 'category', value: categoryId },
      { name: 'sortBy', value: sortValue?.sortBy },
      { name: 'order', value: sortValue?.sortOrder },
      { name: 'search', value: searchValue },
      { name: 'page', value: currentPage },
      { name: 'limit', value: 4 },
    ];

    const urlParamsString = urlParams
      .map(({ name, value }) => {
        return value ? `${name}=${value}&` : '';
      })
      .join('');

    fetch(`https://65de266ddccfcd562f5665ae.mockapi.io/items?${urlParamsString}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortValue, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} changeCallback={(id) => setCategoryId(id)} />
        <Sort
          value={sortValue}
          changeCallback={(value) => {
            setSortValue(value);
          }}
        />
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
      <Pagination onChangePage={sortCurrentPage} />
    </div>
  );
};

export default Home;
