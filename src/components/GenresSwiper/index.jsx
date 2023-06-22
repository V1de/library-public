import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './style.css';
import ApiService from '../../helpers/api-helpers';

const genresApi = new ApiService('books/genres');

const GenresSwiper = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    genresApi
      .getAllItems({
        count: 10,
        include: 'attachments'
      })
      .then((res) => {
        setGenres(res.rows);
      });
  }, []);

  return (
    genres && (
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
          {genres.map((genre) => (
            <SwiperSlide onClick={() => navigate(`/books?genres=${genre.id}`)}>
              <img src={`http://localhost/uploads/${genre.attachment.storageKey}`} alt={genre.attachment.filename} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default GenresSwiper;
