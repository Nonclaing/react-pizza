import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: {},
    count: 0,
  },
  reducers: {
    setItemCount(state, action) {
      const oldItemCount = state.items[action.payload.item.id].count || 0;
      const newCount = oldItemCount - action.payload.count;
      state.items[action.payload.item] = { ...action.payload.item, count: action.payload.count };
      state.count -= newCount;
      state.totalPrice -= newCount * state.items[action.payload.item.id].price;
    },
    addItem(state, action) {
      if (state.items[action.payload.item.id]) {
        state.items[action.payload.item.id].count += 1;
      } else {
        state.items[action.payload.item.id] = { ...action.payload.item, count: 1 };
      }

      state.count += 1;
      state.totalPrice += state.items[action.payload.item.id].price;
    },
    removeItem(state, action) {
      if (!state.items[action.payload.item.id]) return;

      state.items[action.payload.item.id].count -= 1;

      state.count -= 1;
      state.totalPrice -= state.items[action.payload.item.id].price;

      if (state.items[action.payload.item.id].count <= 0)
        delete state.items[action.payload.item.id];
    },
    clearItem(state, action) {
      if (!state.items[action.payload.item.id]) return;

      state.count -= state.items[action.payload.item.id].count;
      state.totalPrice -=
        state.items[action.payload.item.id].price * state.items[action.payload.item.id].count;

      delete state.items[action.payload.item.id];
    },
    clearItems(state, action) {
      state.count = 0;
      state.items = {};
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { setItemCount, addItem, removeItem, clearItems, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
