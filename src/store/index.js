import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import cartSlice from './cart-Slice';
import uiSlice from './ui-Slice';

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer
    },
})
export default store;