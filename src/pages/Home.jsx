import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../templates/Base';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const hasFilter = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const { pizzaItems, loading, rejected } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const navigate = useNavigate();

  useEffect(setFilterParams, []);

  useEffect(setUrlParams, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (!hasFilter.current) {
      getPizzas();
    }

    hasFilter.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  function setUrlParams() {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const queryString = qs.stringify({
      sortId: sort.id,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }

  function setFilterParams() {
    if (!window.location.search) return;

    const params = qs.parse(window.location.search.substring(1));
    dispatch(setFilters({ ...params }));
    hasFilter.current = true;
  }

  async function getPizzas() {
    try {
      await dispatch(fetchPizzas({ categoryId, sort, currentPage, searchValue }));
    } catch (e) {
      console.log(e);
    }
  }

  function onChangePage(number) {
    dispatch(setCurrentPageCount(number));
  }

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {rejected ? (
        <div>
          <h2>Произошла ошибка</h2>
        </div>
      ) : (
        <div className='content__items'>
          {loading
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzaItems.map(({ id, title, price, imageUrl, sizes, types }) => {
                return (
                  <PizzaBlock
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    imageUrl={imageUrl}
                    sizes={sizes}
                    types={types}
                  />
                );
              })}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
