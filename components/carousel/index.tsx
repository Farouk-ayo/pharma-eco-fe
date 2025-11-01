"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { testimonials } from "@/lib/data";
import Badge from "../badge";

const Carousel = () => {
  return (
    <div className="relative  mx-auto  py-10 px-4 overflow-x-hidden rounded-b-[100px] rounded-t-[16px] bg-white ">
      <Badge
        text="TESTIMONIALS"
        className=" m-auto text-center flex justify-center"
      />

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "inline-block h-2 w-2 mx-1 rounded-full bg-primary/15 cursor-pointer transition-all duration-300",
          bulletActiveClass: "!bg-primary",
        }}
        className=""
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="relative z-10  text-primaryDark   flex flex-col gap-2 md:py-5 mx-auto text-center justify-center items-center ">
              <Image
                src="/testimonial-1.png"
                alt="testimonial"
                height={68}
                width={68}
                objectFit="cover"
              />
              <p className=" md:text-lg font-semibold">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="font-semibold text-black  text-base md:text-base">
                {testimonial.author}
                <br />
                <span className="text-black/70 !font-normal  text-base md:text-xl">
                  {testimonial.designation}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination   !-translate-y-1/2    !-bottom-2 !left-[40%] sm:!left-[47%]  !m-auto  !absolute !w-full   !z-20" />
    </div>
  );
};

export default Carousel;
