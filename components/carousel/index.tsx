"use client";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";

const cards = [
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
export default function Carousel({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className="relative w-full h-full px-4  flex items-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${
            vertical ? "/community-slider-2.png" : "/community-slider.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#023022E8]/90 via-[#157D18B8]/48 to-[#157D18B8]/70 bg-[#157D18]/50 md:bg-transparent" />
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="h-full">
            <div
              className={`relative z-10 mx-auto py-16 flex flex-col  justify-center h-full ${
                vertical
                  ? "text-left items-start"
                  : "text-center max-w-5xl items-center"
              }  text-white  px-4`}
            >
              <p className="text-2xl md:text-4xl text-white font-medium italic mb-4">
                “{card.quote}”
              </p>
              <p className="text-lg font-medium text-secondary">
                {card.author}
                <br />
                <span className="text-secondary/70">{card.designation}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
