import { FC } from 'react';
import Logo from './logo';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-zinc-800 py-8">
      <div className="app-container grid grid-cols-4 gap-12 !pb-0 text-left">
        <div className="col-span-4 xl:col-span-1 flex flex-col gap-2">
          <Logo />
          <h6 className="text-sm font-bold">Hyper Teknoloji</h6>
        </div>
        <div className="col-span-4 xl:col-span-1">
          <h6 className="text-sm font-bold">Routes</h6>
          <ul className="flex flex-col text-sm gap-2 mt-3">
            {ROUTES.map((route) => (
              <Link href={route.path} key={route.id} title={route.title} className="hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
                {route.title}
              </Link>
            ))}
          </ul>
        </div>

        <div className="col-span-4 xl:col-span-1">
          <h6 className="text-sm font-bold">Contact</h6>
          <ul className="flex flex-col text-sm gap-3 mt-3">
            <li className="flex items-center gap-2 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <Mail size={16} />
              <a href="mailto:metinerdempatweb@gmail.com">metinerdempatweb@gmail.com</a>
            </li>

            <li className="flex items-center gap-2 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500">
              <Phone size={16} />
              <a href="tel:+905365510558">+90 536 551 05 58</a>
            </li>
          </ul>
        </div>

        <div className="col-span-4 xl:col-span-1">
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
        <div className="col-span-4">
          <div className="flex justify-start xl:justify-center">
            <img src="/accepted_cards.png" alt="Footer Logo" width={150} height={50} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
