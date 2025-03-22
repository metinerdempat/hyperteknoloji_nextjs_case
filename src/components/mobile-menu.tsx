import { FC } from 'react';
import clsx from 'clsx';
import AnimatedLink from './animated-link';
import { Mail, Phone, ShoppingCartIcon, SidebarCloseIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import Logo from './logo';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { getBasketQuantity } from '@/utils';
import ToggleTheme from './toggle-theme';

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const MobileMenu: FC<Props> = ({ isMenuOpen, toggleMenu }) => {
  const basket = useSelector((state: RootState) => state.basketStore.basket);

  const basketQuantity = getBasketQuantity(basket);

  return (
    <aside
      className={clsx('z-[999] w-full h-full py-4 px-6 fixed top-0 left-0 bg-white dark:bg-zinc-800 transition-transform duration-200', {
        'translate-x-full': !isMenuOpen,
        'translate-x-0': isMenuOpen,
      })}
    >
      <div className="w-full flex justify-end">
        <button type="button" onClick={toggleMenu}>
          <SidebarCloseIcon size={24} color="oklch(0.546 0.245 262.881)" />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-10">
        <div className=" flex flex-col gap-2">
          <Logo />
          <h6 className="text-sm font-bold">Hyper Teknoloji</h6>
        </div>
        <div>
          <h6 className="text-sm font-bold">Routes</h6>
          <ul className="flex flex-col text-sm gap-2 mt-3">
            {ROUTES.map((route) => (
              <Link href={route.path} key={route.id} title={route.title} className="hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500"
                onClick={toggleMenu}
              >
                {route.title}
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="text-sm font-bold">Contact</h6>
          <ul className="flex flex-col text-sm gap-3 mt-3">
            <li className="flex items-center gap-2 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <Mail size={16} />
              <a href="mailto:metinerdempatweb@gmail.com">metinerdempatweb@gmail.com</a>
            </li>

            <li className="flex items-center gap-2 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <Phone size={16} />
              <a href="tel:+905555555555">+90 555 555 55 55</a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-sm font-bold">Social Media</h6>
          <ul className="flex flex-col text-sm gap-3 mt-3">
            <li className="hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <a href="https://twitter.com/merdempatt" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li className="hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <a href="https://instagram.com/metinerdempat" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-sm font-bold">Basket</h6>
          <AnimatedLink
            className="mt-4 inline-flex"
            text={`Basket (${basketQuantity})`}
            href="/basket"
            leftIcon={<ShoppingCartIcon size={16} />}
          />
        </div>

        <div>
          <h6 className='text-sm font-bold mb-4'>Theme</h6>
          <ToggleTheme />

        </div>
      </div>
    </aside>
  );
};

export default MobileMenu;
