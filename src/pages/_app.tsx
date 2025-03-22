import '@/styles/globals.css';
import 'swiper/css';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/stores';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

const Header = dynamic(() => import('@/components/header'), { ssr: false });

type Props = AppProps & {};

const App: FC<Props> = ({ Component, pageProps }) => {
  return (
    <div className={`${inter.className}`}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Provider store={store}>
          <Toaster />
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </PersistGate>
        </Provider>
      </NextThemesProvider>
    </div>
  );
};

export default App;
