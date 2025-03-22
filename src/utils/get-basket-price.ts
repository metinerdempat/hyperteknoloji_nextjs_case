import type { ProductWithQuantity } from '@/stores/basket-slice';

const getBasketPrice = (basket: ProductWithQuantity[]) => {
  return basket.reduce((acc, current) => {
    return acc + (current.price * current.quantity);
  }, 0);
};


export default getBasketPrice;
