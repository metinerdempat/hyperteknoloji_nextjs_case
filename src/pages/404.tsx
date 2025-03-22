import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const NotFoundPage: NextPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.replace('/');
  };

  return (
    <>
      <NextSeo
        title="Hyper Teknoloji E Commerce - 404"
        noindex
        nofollow
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/hyper_teknoloji_favicon.webp',
          },
        ]}
      />
      <section className="grid place-items-center w-full h-full min-h-[600px]">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-zinc-300">404 - Page Not Found</h1>
          <p className="text-center text-gray-600 dark:text-zinc-400">The page you are looking for does not exist.</p>
          <button type="button" onClick={goBack} className="py-2.5 px-6 rounded-md bg-blue-500 text-white">
            Go Back
          </button>
        </div>
      </section>
    </>
  );
};

/** 
   Possible way to handle 404 pages
   Detailed Link: https://nextjs.org/docs/messages/404-get-initial-props
**/
export const getInitialProps = async () => {
  return {
    props: {},
  };
};

export default NotFoundPage;
