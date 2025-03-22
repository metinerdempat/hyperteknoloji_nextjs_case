import Faqs from '@/components/faqs';
import Brands from '@/components/brands';
import AnimatedLink from '@/components/animated-link';
import { NextPage } from 'next';
import axios from 'axios';
import { Brand, Faq } from '@/types';
import { NextSeo } from 'next-seo';

type Props = {
  faqs: Faq[];
  brands: Brand[];
};

const Home: NextPage<Props> = ({ faqs, brands }) => {
  return (
    <>
      <NextSeo
        title="Hyper Teknoloji E Commerce"
        description="Hyper Teknoloji E Commerce"
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/hyper_teknoloji_favicon.webp',
          },
        ]}
      />
      <section className="app-container">
        <div className="mt-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pb-4">
            <h2 className="text-4xl font-bold text-center text-white dark:text-neutral-100">Featured Products</h2>
            <AnimatedLink text="Let’s Shop" href="/products" className="text-blue-400" />
          </div>

          <img src="/hero.png" alt="Hero Image" className="w-6xl h-[450px] object-fill rounded-xs grayscale-75" />
        </div>

        <div className="mt-12">
          <Faqs faqs={faqs} />
        </div>

        <div className="mt-16">
          <Brands brands={brands} />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const BASE_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const [faqs, brands] = await Promise.all([
    axios.get(`${BASE_APP_URL}/api/faqs`),
    axios.get(`${BASE_APP_URL}/api/brands`),
  ]);

  return {
    props: {
      faqs: faqs.data,
      brands: brands.data,
    },
  };
};

export default Home;
