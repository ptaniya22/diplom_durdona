import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await axios.get(`https://dummyjson.com/products?limit=100`);
    const data = await res.data.products;

    return data;
  }

);

export const githubSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortProducts: (state, action) => {
      state.products?.sort((a, b) => {
        if (a[action.payload] > b[action.payload]) {
          return 1
        } else {
          return -1
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { sortProducts } = githubSlice.actions

export default githubSlice.reducer;
