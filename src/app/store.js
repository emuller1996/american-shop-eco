import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/Car/carSlice";
import productReducer from "../features/Products/ProductSlice";

export const store = configureStore({
  reducer: {
    cart: carReducer,
    products: productReducer,
  },
});
