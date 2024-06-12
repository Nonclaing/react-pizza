import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';

const rootReducer = combineReducers({
  filter: filterSlice,
  cart: cartSlice,
  pizza: pizzaSlice,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
