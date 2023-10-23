import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    SetProducts: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetProducts } = productSlice.actions;

export default productSlice.reducer;
