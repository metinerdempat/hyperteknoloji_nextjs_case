import { RootState } from '@/stores';
import { moneyFormatter } from '@/utils';
import { MinusCircleIcon, MoveRightIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket, removeFromBasket, decreaseBasket, ProductWithQuantity } from '@/stores/basket-slice';
import { toast } from 'sonner';
import { FC, useMemo } from 'react';
import AnimatedLink from '@/components/animated-link';
import { MAX_PRODUCT_BASKET_LIMIT } from '@/constants';
import { NextSeo } from 'next-seo';

type Props = {};

const BasketPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basketStore.basket);

  const total = useMemo(() => {
    return basket.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }, [basket]);

  const addToBasket = (product: ProductWithQuantity) => {
    if (product.quantity + 1 > MAX_PRODUCT_BASKET_LIMIT) {
      return toast.error(`You can add up to ${MAX_PRODUCT_BASKET_LIMIT} of the same product!`, {
        className: '!bg-red-500 !text-white',
      });
    }
    dispatch(addBasket(product));
    toast.success(`${product.title} added to basket!`, {});
  };

  const removeProductFromBasket = (product: ProductWithQuantity) => {
    dispatch(removeFromBasket(product.id));
    toast.success(`${product.title} removed from basket!`, {});
  };

  const decreaseFromBasket = (product: ProductWithQuantity) => {
    dispatch(decreaseBasket(product.id));
    toast.success(`${product.title} decreased from basket!`, {});
  };

  return (
    <>
      <NextSeo
        title="Hyper Teknoloji E Commerce - Basket"
        description="Hyper Teknoloji E Commerce - Basket"
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/hyper_teknoloji_favicon.webp',
          },
        ]}
      />
      <section className="app-container mt-12">
        <h1 className="font-bold text-xl text-blue-500">My Basket</h1>
        <div className="mt-5 grid grid-cols-12 gap-5 xl:gap-10">
          <div className="col-span-12 xl:col-span-8">
            <div className="flex flex-col gap-5">
              {basket.length === 0 && (
                <div>
                  <h6 className="text-xl font-medium">Basket is Empty</h6>
                  <AnimatedLink
                    href="/products"
                    className="mt-3 inline-flex text-sm"
                    text="Continue to Shopping"
                    leftIcon={<ShoppingCartIcon size={18} />}
                  />
                </div>
              )}
              {basket.length > 0 &&
                basket.map((product, i) => (
                  <div
                    key={i}
                    className="flex flex-col xl:flex-row xl:items-center xl:justify-between bg-white dark:bg-zinc-800 p-4 shadow-md dark:shadow-none shadow-blue-50 rounded-md hover:shadow-blue-100 transition-all duration-150"
                  >
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.title} className="w-20 h-20 object-fill rounded-md" />
                      <div>
                        <h3 className="text-sm font-bold max-w-[200px]">{product.title}</h3>
                        <p className="mt-2 text-sm max-w-[250px] truncate">{product.description}</p>
                        <p className="mt-1 text-sm font-bold">{moneyFormatter(product.price)}</p>
                      </div>
                    </div>
                    <div className="flex mt-5 xl:mt-0 items-center gap-3">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => addToBasket(product)}
                          className="bg-blue-400 text-white w-7 h-7 grid place-items-center rounded-sm hover:bg-blue-500 transition-all duration-150"
                        >
                          <PlusIcon size={16} />
                        </button>
                        <div className="grid place-items-center h-7 bg-zinc-100 dark:bg-zinc-600 dark:text-white rounded-md text-black text-center px-4">
                          {product.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => decreaseFromBasket(product)}
                          className="bg-red-400 text-white w-7 h-7 grid place-items-center rounded-sm hover:bg-red-500 transition-all duration-150"
                        >
                          <MinusCircleIcon size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProductFromBasket(product)}
                        className="bg-red-400 text-white w-7 h-7 grid place-items-center rounded-sm hover:bg-red-500 transition-all duration-150"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col bg-white h-max dark:bg-zinc-800 shadow-md p-4 rounded-md">
            <h6 className="text-xl font-medium">Hyper Teknoloji Basket</h6>
            <div className="mt-3 flex flex-col gap-2 pl-2">
              {basket.map((product) => (
                <p key={product.id} className="text-sm">
                  ({product.quantity}) x <span className="bold">{product.title}</span> - {moneyFormatter(product.price)}
                </p>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2.5">
              <span className="bold">Total:</span>
              <span className="bold text-blue-500">{moneyFormatter(total)}</span>
            </p>

            {basket.length > 0 && (
              <AnimatedLink
                href="/checkout"
                className="mt-4 inline-flex text-sm shadow-none"
                text="Proceed to Checkout"
                rightIcon={<MoveRightIcon size={16} />}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BasketPage;
