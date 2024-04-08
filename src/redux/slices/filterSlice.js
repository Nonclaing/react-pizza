import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    sort: {
      id: 0,
      text: 'популярности (воз.)',
      sortBy: 'rating',
      sortOrder: 'ask',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortValue(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSortValue } = filterSlice.actions;

export default filterSlice.reducer;
