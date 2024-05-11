import { createSlice } from '@reduxjs/toolkit';
import { list as sortList } from './../../components/Sort/Sort';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    currentPage: 1,
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortValue(state, action) {
      state.sort = action.payload;
    },
    setCurrentPageCount(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      const currentPage = Number(action.payload.currentPage);
      const sortId = Number(action.payload.sortId);
      const categoryId = Number(action.payload.categoryId);
      const sort = sortList.find(({ id }) => id === sortId);

      state.currentPage = currentPage ? currentPage : state.currentPage;
      state.sort = sort ? sort : state.sort;
      state.categoryId = categoryId ? categoryId : state.categoryId;
    },
  },
});
export const selectFilter = (state) => state.filter;
export const selectFilterSort = (state) => state.filter.sort;
export const selectCategoryId = (state) => state.filter.categoryId;

export const { setCategoryId, setSortValue, setCurrentPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
