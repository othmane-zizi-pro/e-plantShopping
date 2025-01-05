// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // <-- import your CartSlice reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // The key 'cart' will represent the state.cart in your Redux store
  },
});

export default store;
