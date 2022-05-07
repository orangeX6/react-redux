import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [{ title: 'Test Item', quantity: 3, total: 18, price: 6 }],
  numberOfItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.unshift({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          total: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
      }
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
      } else {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
      state.totalAmount -= existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;