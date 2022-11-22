import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const carSlice = createSlice({
  name: 'cart',
  initialState : {
    cart:[{
        "id": 6,
        "name": "iPhone 13",
        "image": "https://phonesdata.com/files/models/Apple-iPhone-13-525.jpg",
        "description": "The iPhone 13 is an excellent representative of the Apple family. It will meet all user expectations. There is no other device of this type on the market with the same screen diagonal and performance.",
        "price": 900,
        "stock": 30,
        "brand": "Apple",
        "rating": 0,
        "CategoryId": 2,
        "Offer": null
    }],
    totalCart:0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    get: (state) => {
      state.value -= 1
    },
    insert: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = carSlice.actions

export default carSlice.reducer