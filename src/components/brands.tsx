import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { Brand } from '@/types';

type Props = {
  brands: Brand[];
};

const swiperSettings: SwiperOptions = {
  modules: [Autoplay],
  slidesPerView: 8,
  spaceBetween: 50,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 1000,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 50,
    },
    1280: {
      slidesPerView: 7,
      spaceBetween: 50,
    },
    1536: {
      slidesPerView: 8,
      spaceBetween: 50,
    },
  }
}

const Brands: FC<Props> = ({
  brands,
}) => {
  return (
    <div>
      <Swiper {...swiperSettings} className='grayscale-100 hover:grayscale-0 dark:grayscale-50 transition-all duration-150'>
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <a href={brand.url} key={brand.id} target="_blank" rel="noreferrer">
              <img
                src={brand.image}
                alt={`${brand.title} Logo`}
                title={brand.title}
                width={192}
                height={96}
                className="object-contain w-48 h-24"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
