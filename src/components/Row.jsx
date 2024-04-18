import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4} // Podešavanje broja vidljivih filmova
          breakpoints={{
            // Prilagođavanje za različite veličine ekrana
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          navigation={{
            prevEl: `.prev${rowID}`,
            nextEl: `.next${rowID}`,
          }}
        >
          {movies.map((item, index) => (
            <SwiperSlide key={index}>
              <Movie item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <MdChevronLeft
          className={`prev${rowID} absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer z-10 hidden group-hover:opacity-50 group-hover:block`}
          size={40}
        />
        <MdChevronRight
          className={`next${rowID} absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer z-10 hidden group-hover:opacity-50 group-hover:block`}
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
