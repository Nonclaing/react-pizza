import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPizza, selectPizza, selectPizzaDetail } from '../redux/slices/pizzaSlice';

function PizzaDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pizzaDetail, loading, rejected } = useSelector(selectPizza);

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      await dispatch(getPizza({ id }));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='container'>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <div className='pizza-block'>
          <img
            className='pizza-block__image'
            src={pizzaDetail.imageUrl}
            alt='Pizza'
            loading={'lazy'}
          />
          <h4 className='pizza-block__title'>{pizzaDetail.title}</h4>
          <div className='pizza-block__bottom'>
            <div className='pizza-block__price'>от {pizzaDetail.price} ₽</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PizzaDetail;
