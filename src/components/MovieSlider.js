import { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import MovieCard, { WithTrending } from './MovieCard';

const MovieSlider = ({ type, heading, data }) => {
  const [slidesPerView, setSlidesPerView] = useState(5); // Default number of slides
  const TrendingMovieCard = WithTrending(MovieCard);

  // Using useCallback to avoid re-creating the function on each render
  const handleResize = useCallback(() => {
    // Adjusted slide widths for larger cards
    const slideWidth = type === 'trending' ? 210 : 180; // Increased width for larger movie cards
    const slidesInView = Math.floor(window.innerWidth / slideWidth);
    setSlidesPerView(slidesInView);
  }, [type]);

  useEffect(() => {
    handleResize(); // Set initial slidesPerView on mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  if (!data || !data.results) return null; // Handle cases where data is empty

  const movies = data.results;

  return (
    <div className="movie-slider mb-8">
      <h4 className="mb-3 text-[20px] text-[#e5e5e5]">{heading}</h4>
      <Swiper
        slidesPerView={slidesPerView} // Dynamically calculated based on window size
        spaceBetween={16}
        slidesPerGroup={Math.min(slidesPerView, movies.length)} // Avoid too large slide groups
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            className={`${type === 'trending' ? 'w-55' : 'w-40 md:w-48'} cursor-pointer flex-grow-0 flex-shrink-0 overflow-hidden rounded`} // Adjusted width classes
          >
            {type === 'trending' ? (
              <TrendingMovieCard index={index + 1} data={movie} />
            ) : (
              <MovieCard data={movie} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
