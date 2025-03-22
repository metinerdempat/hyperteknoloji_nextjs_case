import { Product } from '@/types';
import { moneyFormatter } from '@/utils';
import { ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { addBasket } from '@/stores/basket-slice';
import { axios } from '@/lib';
import { GetServerSideProps, NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useDebounce } from 'react-use';
import { Input } from '@/components/ui/input';
import { NextSeo } from 'next-seo';

type Props = {
  products: Product[];
  categories: string[];
};

const ProductsPage: NextPage<Props> = ({ products, categories }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basketStore.basket);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  const addToBasket = (product: Product) => {
    dispatch(addBasket(product));
    toast.success(`${product.title} added to basket!`, {});
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  useDebounce(
    () => {
      setDebouncedQuery(query);
    },
    250,
    [query],
  );

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (debouncedQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    return filteredProducts;
  }, [products, debouncedQuery, selectedCategory]);

  return (
    <>
      <NextSeo
        title="Hyper Teknoloji E Commerce Products"
        description="Hyper Teknoloji E Commerce Products"
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/hyper_teknoloji_favicon.webp',
          },
        ]}
      />
      <section className="app-container mt-12">
        <h1 className="font-bold text-xl text-blue-500">Featured Products</h1>

        <div className="mt-4 grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-3">
            <div className="bg-white dark:bg-zinc-800 dark:shadow-none p-4 shadow-md shadow-blue-50 rounded-md h-max">
              <h6 className="text-black dark:text-neutral-300 font-medium">Search</h6>

              <Input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="mt-6 bg-white dark:bg-zinc-800 dark:shadow-none p-4 shadow-md shadow-blue-50 rounded-md h-max">
              <h6 className="text-black dark:text-neutral-300 font-medium">Categories</h6>
              <ul className="mt-2 flex flex-col gap-1.5">
                {categories.map((category, i) => (
                  <li key={i} className="w-full">
                    <Button
                      type="button"
                      onClick={() => handleCategoryChange(category === selectedCategory ? null : category)}
                      className={clsx(
                        'w-full flex justify-start hover:bg-blue-600 dark:hover:bg-zinc-600 text-white dark:text-neutral-300 bg-blue-500 rounded-md p-2 text-sm',
                        {
                          'bg-blue-500': selectedCategory !== category,
                          'bg-blue-600 dark:bg-zinc-600': selectedCategory === category,
                        },
                      )}
                    >
                      {category}
                    </Button>
                  </li>
                ))}

                <li>
                  <Button
                    type="button"
                    onClick={() => handleCategoryChange(null)}
                    className="mt-3 bg-transparent text-black dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  >
                    Clear
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-9">
            <div className="grid grid-cols-4 gap-4">
              {filteredProducts.length === 0 && (
                <div className="col-span-12 text-center text-black dark:text-zinc-300">No products found!</div>
              )}
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-span-4 md:col-span-2 xl:col-span-1 bg-white dark:bg-zinc-800 dark:shadow-none p-4 shadow-md shadow-blue-50 rounded-md hover:shadow-blue-100 transition-all duration-150
          "
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={200}
                    className="rounded-md w-full h-48 object-fill"
                  />
                  <h3 className="mt-6 text-sm truncate font-bold text-black dark:text-zinc-200">{product.title}</h3>
                  <p className="mt-3 text-sm truncate text-black dark:text-zinc-300">{product.description}</p>
                  <p className="mt-2 text-sm font-bold text-black dark:text-zinc-300">
                    {moneyFormatter(product.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() => addToBasket(product)}
                    className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-500 transition-all duration-150 text-sm flex items-center gap-2"
                  >
                    <ShoppingCartIcon size={16} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [{ data: products }, { data: categories }] = await Promise.all([
    axios.get('/products'),
    axios.get('/products/categories'),
  ]);

  return {
    props: {
      products,
      categories,
    },
  };
};

export default ProductsPage;
