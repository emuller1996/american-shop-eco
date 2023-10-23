import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalPages: undefined,
    page: 0,
    category:"",
    search :""
  },
  reducers: {
    SetProducts: (state, action) => {
      return { ...state, products: action.payload };
    },
    setPage :(state, action) => {
      return { ...state, page: action.payload };
    },
    setCategory :(state, action) => {
      return { ...state, category: action.payload };
    },
    setTotalPages :(state, action) => {
      return { ...state, totalPages: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetProducts,setPage,setCategory ,setTotalPages} = productSlice.actions;

export default productSlice.reducer;
