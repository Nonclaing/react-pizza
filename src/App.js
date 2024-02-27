import './scss/app.scss';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Sort from './components/Sort/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://65de266ddccfcd562f5665ae.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map(({ id, title, price, imageUrl, sizes, types }) => {
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
        </div>
      </div>
    </div>
  );
}

export default App;
