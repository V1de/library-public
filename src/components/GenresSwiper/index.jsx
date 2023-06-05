import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './style.css';

const GenresSwiper = () => {
  return (
    <div className="block px-5">
      <h2 className="w-full text-left text-xl text-gray-500 font-bold">Popular genres</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={4}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="images/Adventure.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Classic.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Dystopian.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Fantasy.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Mystery.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Adventure.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Classic.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Dystopian.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Fantasy.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/Mystery.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default GenresSwiper;
