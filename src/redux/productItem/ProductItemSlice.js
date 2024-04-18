import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productItem: null,
};

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  const data = await res.data;

  return data;
});

export const ProductItemSlice = createSlice({
  name: "productItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productItem = action.payload;
    });
  },
});

export default ProductItemSlice.reducer;
