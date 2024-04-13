import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../templates/Base';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageCount, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  const hasFilter = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const navigate = useNavigate();

  useEffect(setFilterParams, []);

  useEffect(setUrlParams, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (!hasFilter.current) {
      fetchPizzas();
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

  function fetchPizzas() {
    setIsLoading(true);
    const urlParamsString = qs.stringify({
      category: categoryId === 0 ? '' : categoryId,
      sortBy: sort?.sortBy,
      order: sort?.sortOrder,
      search: searchValue,
      page: currentPage,
      limit: 4,
    });

    axios
      .get(`https://65de266ddccfcd562f5665ae.mockapi.io/items?${urlParamsString}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
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
