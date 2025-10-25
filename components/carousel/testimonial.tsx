"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "../icons";
import Image from "next/image";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "PharmaEco made it so easy for our hospital to safely dispose of expired medicines. I’m glad there’s finally a structured solution for this in Nigeria",
      author: "Pharm. Lanre Adebayo",
      designation: "Principal Pharmacist, Well-Land General Hospital",
    },
    {
      quote:
        "I never knew throwing unused drugs in the dustbin was dangerous until I found PharmaEco. Now, I just drop them at the nearest collection point",
      author: "Tunde Balogun",
      designation: "Resident, Surulere",
    },
    {
      quote:
        "Our pharmacy joined PharmaEco’s program, and it’s been a smooth process. We also educate our customers about safe disposal",
      author: "Pharm. (Dr.). Yetunde Olaniyi",
      designation: "Pharmacy Owner, MediAir Pharmacy, Lekki",
    },
    {
      quote:
        "The awareness PharmaEco creates about pharmaceutical waste is eye-opening. It’s a great step toward a cleaner Nigeria.",
      author: "Mr. Femi Ajayi",
      designation: "Environmental Health Officer, Lagos Mainland",
    },
    {
      quote:
        "PharmaEco’s collection initiative is a game changer for public health and environmental protection in Lagos",
      author: "Dr. Segun Adeola",
      designation: "Public Health Consultant, Victoria Island",
    },
  ];

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
            <div className="relative z-10  text-primaryDark   flex flex-col gap-2 md:gap-10 h-full py-20 md:py-20 mx-auto text-center justify-center items-center w-[80%] lg:w-[65%]">
              <Image
                src="/testimonial-1.png"
                alt="testimonial"
                height={123}
                width={123}
                objectFit="cover"
              />
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
