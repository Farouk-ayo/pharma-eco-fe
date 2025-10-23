"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "../icons";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "PharmaBin is actually a great initiative. Now I realize I've never really put much thought into how drugs are disposed of especially when they are expired. We basically just remove from stock and pack it somewhere. Where they go afterwards, I actually never bothered to find out",
      author: "Pharm. Blessing Ademola",
      designation: "Intern Pharmacist at UNIMED, Ondo",
    },
    {
      quote:
        "This is such a fantastic initiative! It's so important to keep our environment safe and healthy. I love that you’re making it easy for people to dispose of medications properly",
      author: "DataPorium",
      designation: "Industry into Data Infrastructure and Analytics",
    },
    {
      quote:
        "I must say, I love the concept of Pharmabin, and I must commend the innovativeness behind it. I can already envision the positive effect of this initiative on public health, and I want to be a part of this",
      author: "Pharm. Esther Olatunbosun",
      designation: "Intern Pharmacist & Public Health Advocate",
    },
    {
      quote:
        "As a pharmacist, I’m so grateful for PharmaBin. It’s bridging the gap in pharmaceutical waste management and educating the public at the same time.",
      author: "Pharm. Oluwabusayo Cyril",
      designation: "CEO Well-Land Pharmacy & Stores",
    },
    {
      quote:
        "I love that PharmaBin is tackling an issue we often overlook. Safe disposal of medicines should be a priority, and this initiative is leading the way!",
      author: "Pharm. Mubarak Usman",
      designation: "Managing Director at Victory Life Industrial Limited",
    },
    {
      quote:
        "PharmaBin is proof that small actions can lead to big changes. Every collected drug is one less contaminant in our environment!",
      author: "Dr. Biodun Sambo",
      designation: "CEO Lando Industrial Limited",
    },
    {
      quote:
        "This initiative is not just about waste disposal; it’s about protecting future generations. I’m proud to support PharmaBin’s mission!",
      author: "Dr. Shakirah Olatunde",
      designation: "Midwife at Kingsley Hospital",
    },
  ];

  return (
    <div className="relative w-full mx-auto md:w-[65%] overflow-x-hidden ">
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
            "inline-block h-2 w-2 mx-1 rounded-full bg-gray-400 cursor-pointer transition-all duration-300",
          bulletActiveClass: "!bg-black",
        }}
        className="h-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="relative z-10 text-left text-primaryDark  flex flex-col gap-2 md:gap-5 h-full py-20 md:py-20">
              <p className="text-xl md:text-2xl italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="font-semibold text-black text-left">
                {testimonial.author}
                <br />
                <span className="text-black/70 !font-normal">
                  {testimonial.designation}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev absolute left-0 bottom-0 z-20 p-2 hover:opacity-75 transition-opacity">
        <ArrowLeft />
      </button>
      <div className="custom-pagination   !-translate-y-1/2  !-bottom-2 !left-[40%] !m-auto  !absolute !w-full   !z-20" />
      <button className="custom-next absolute right-0 bottom-0 z-20 p-2 hover:opacity-75 transition-opacity">
        <ArrowRight />
      </button>
    </div>
  );
};

export default TestimonialSection;
