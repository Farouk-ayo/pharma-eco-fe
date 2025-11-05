"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "../icons";
import Image from "next/image";
import { testimonials } from "@/lib/data";

const TestimonialSection = () => {
  return (
    <div className="relative w-full mx-auto  overflow-x-hidden pb-10 sm:pb-40">
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
        className="h-full "
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="relative z-10  text-primaryDark   flex flex-col gap-2 md:gap-10 h-full py-20 md:py-20 mx-auto text-center justify-center items-center w-[80%] lg:w-[65%] rounded-full">
              <div className="relative w-28 h-28">
                <Image
                  src={testimonial.imageUrl}
                  alt="testimonial"
                  objectFit="cover"
                  fill
                  className="rounded-full border-2 object-cover border-primary"
                />
              </div>

              <p className="text-xl md:text-3xl font-semibold">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="font-semibold text-black  text-base md:text-2xl">
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

      <button className="custom-prev absolute left-0 bottom-[30%] lg:bottom-1/2 z-20 p-2 hover:opacity-75 transition-opacity">
        <ArrowLeft className="w-10 md:w-max" />
      </button>
      <div className="custom-pagination   !-translate-y-1/2    !-bottom-2 !left-[40%] sm:!left-[47%]  !m-auto  !absolute !w-full   !z-20" />
      <button className="custom-next absolute right-0 bottom-[30%] lg:bottom-1/2 z-20 p-2 hover:opacity-75 transition-opacity">
        <ArrowRight className="w-10 md:w-max" />
      </button>
    </div>
  );
};

export default TestimonialSection;
