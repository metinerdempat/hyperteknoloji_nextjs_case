import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types';

export type ProductWithQuantity = Product & { quantity: number };

type BasketSliceState = {
  basket: ProductWithQuantity[];
};

const sliceState: BasketSliceState = {
  basket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: sliceState,
  reducers: {
    addBasket: (state, action: PayloadAction<Product | ProductWithQuantity>) => {
      const isExist = state.basket.find((product) => product.id === action.payload.id);
      if (!isExist) {
        state.basket.push({ ...action.payload, quantity: 1 });
      } else {
        isExist.quantity += 1;
      }
    },
    decreaseBasket: (state, action: PayloadAction<ProductWithQuantity['id']>) => {
      const isExist = state.basket.find((product) => product.id === action.payload);
      if (isExist) {
        if (isExist.quantity === 1) {
          state.basket = state.basket.filter((p) => p.id !== action.payload);
        } else {
          isExist.quantity -= 1;
        }
      }
    },
    removeFromBasket: (state, action: PayloadAction<ProductWithQuantity['id']>) => {
      state.basket = state.basket.filter((p) => p.id !== action.payload);
    },
    clearBasket: (state) => {
      state.basket = [];
    }
  }
});

export const { addBasket, decreaseBasket, removeFromBasket, clearBasket, } = basketSlice.actions;

export default basketSlice.reducer;
