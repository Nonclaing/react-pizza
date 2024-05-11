import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchByUdStatus',
  async ({ categoryId, sort, searchValue, currentPage, limit = 4 }, thunkAPI) => {
    const urlParamsString = qs.stringify({
      category: categoryId === 0 ? '' : categoryId,
      sortBy: sort?.sortBy,
      order: sort?.sortOrder,
      search: searchValue,
      page: currentPage,
      limit,
    });

    const { data } = await axios.get(
      `https://65de266ddccfcd562f5665ae.mockapi.io/items?${urlParamsString}`,
    );
    return data;
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    pizzaItems: [],
    loading: true,
    rejected: false,
  },
  reducers: {
    setItems(state, action) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loading = true;
      state.rejected = false;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzaItems = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.loading = false;
      state.rejected = true;
    });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
