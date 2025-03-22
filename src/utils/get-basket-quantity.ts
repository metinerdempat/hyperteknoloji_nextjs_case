import type { ProductWithQuantity } from '@/stores/basket-slice';

const getBasketQuantity = (basket: ProductWithQuantity[]) => {
  return basket.reduce((acc, current) => {
    return acc + current.quantity;
  }, 0);
};


export default getBasketQuantity;
