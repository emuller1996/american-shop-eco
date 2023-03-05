import { createSlice } from '@reduxjs/toolkit'
import  { useLocalStorage }  from '../../hooks/useLocalStorage.js'


export const carSlice = createSlice({
  name: 'cart',
  initialState : [],
  reducers: {
    addProductToCart: (state,action) => {
      window.localStorage.setItem( 'mycart' , JSON.stringify([...state, action.payload]) )
      if(!state.includes( p => p.id !== action.payload.id )){
        return [...state, action.payload]
      }
    },
    deleteProductsToCart: ( state , action) => {
      console.log(action.payload)
      window.localStorage.setItem( 'mycart' , JSON.stringify([ ...state.filter( p => p.id !== action.payload)]))
      return [ ...state.filter( p => p.id !== action.payload)]
    },
    getCardProductToCard : (state, action) =>{
      var products = window.localStorage.getItem('mycart')
      return  JSON.parse(products)
    }
    
  
  },
})

// Action creators are generated for each case reducer function
export const { addProductToCart, deleteProductsToCart,getCardProductToCard } = carSlice.actions

export default carSlice.reducer