import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { ROUTES } from '@/constants';
import { MenuIcon, ShoppingCartIcon } from 'lucide-react';
import Logo from './logo';
import { useMedia } from 'react-use';
import MobileMenu from './mobile-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { getBasketQuantity } from '@/utils';
import { Button } from './ui/button';
import ToggleTheme from './toggle-theme';

type Props = {};

const Header: FC<Props> = ({}) => {
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const basket = useSelector((state: RootState) => state.basketStore.basket);
 

  const toggleMenu = () => setIsMenuOpen((state) => !state);

  const basketQuantity = useMemo(() => {
    return getBasketQuantity(basket);
  }, [basket]);

  return (
    <>
      <header className="w-full shadow-md bg-white dark:bg-neutral-900 transition-all shadow-blue-50 dark:shadow-none dark:border-b dark:border-b-neutral-800">
        <div className="app-container flex items-center justify-between xl:max-w-5xl !py-5 mx-auto">
          <Logo />
          {isLargerThan1024 && (
            <nav>
              <ul className="flex items-center gap-4">
                {ROUTES.map((route) => (
                  <li key={route.id} className="hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500 text-sm">
                    <Link href={route.path}>{route.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {isLargerThan1024 ? (
            <div className="flex items-center gap-3">
              <ToggleTheme />

              <Link href="/basket">
                <Button size="icon" type="button" className="relative bg-white hover:bg-white dark:bg-blue-500">
                  <ShoppingCartIcon size={24} className='text-black dark:text-white' />
                  {basketQuantity > 0 && (
                    <span className="block absolute -top-2.5 -right-2.5 bg-blue-500 shadow-md w-5 h-5 rounded-full text-sm text-white">
                      {basketQuantity}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          ) : (
            <button type="button" onClick={toggleMenu}>
              <MenuIcon size={24} color="oklch(0.546 0.245 262.881)" />
            </button>
          )}
        </div>
      </header>
      {!isLargerThan1024 && <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
    </>
  );
};

export default Header;
