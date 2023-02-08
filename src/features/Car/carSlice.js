import { createSlice } from '@reduxjs/toolkit'


export const carSlice = createSlice({
  name: 'cart',
  initialState : {
    cart:[],
    totalCart:0,
  },
  reducers: {
    setCart: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart = action.payload
    },
    setTotalCart:(state,action)=>{

      state.totalCart = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setCart, setTotalCart } = carSlice.actions

export default carSlice.reducer