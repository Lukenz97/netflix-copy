import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContenxt";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";


function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();


  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setMovies(doc.data()?.savedShows || []);
      });
      return () => unsubscribe();
    }
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative group" style={{ marginTop: '400px' }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          navigation={{
            prevEl: `.prev`,
            nextEl: `.next`,
          }}
          className="mySwiper"
        >
          {movies.map((item, id) => (
            <SwiperSlide key={id}>
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[325px] inline-block cursor-pointer relative p-2">
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title || "Movie image"}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose/></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <MdChevronLeft
          className={`prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer z-10 hidden group-hover:opacity-50 group-hover:block`}
          size={40}
        />
        <MdChevronRight
          className={`next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer z-10 hidden group-hover:opacity-50 group-hover:block`}
          size={40}
        />
      </div>
    </>
  );
}

export default SavedShows;
