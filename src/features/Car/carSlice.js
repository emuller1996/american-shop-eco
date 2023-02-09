import { createSlice } from '@reduxjs/toolkit'


export const carSlice = createSlice({
  name: 'cart',
  initialState : [],
  reducers: {
    addProductToCart: (state,action) => {
      if(!state.includes( p => p.id !== action.payload.id )){
        return [...state, action.payload]
      }
    },
    deleteProductsToCart: ( state , action) => {
      console.log(action.payload)
      return [ ...state.filter( p => p.id !== action.payload)]
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { addProductToCart, deleteProductsToCart } = carSlice.actions

export default carSlice.reducer