"use client";
import Badge from "@/components/badge";
import Button from "@/components/buttons";
import { Card } from "@/components/cards";
import Carousel from "@/components/carousel";
import TestimonialSection from "@/components/carousel/testimonial";
import DisposalDiagram from "@/components/disposalDiagram";
import FaqSection from "@/components/faq";
import Footer from "@/components/footer";
import CallToAction from "@/components/footer/callToAction";
import GallerySection from "@/components/gallery";
import Header from "@/components/header";
import { CheckMark } from "@/components/icons";
import { DividerIcon } from "@/components/icons/divider";
import Navbar from "@/components/navbar";
import { useGetArticles } from "@/lib/hooks/api/queries";
import Image from "next/image";

export default function Home() {
  const { data: articles } = useGetArticles();
  const cards = articles?.slice(0, 3) || [];
  const sdgData = [
    {
      id: 3,
      title: "Good Health and Well-being",
      description:
        "By ensuring safe disposal of pharmaceutical waste, PharmaBin prevents drug misuse, reduces antimicrobial resistance, and minimizes health hazards caused by improper disposal.",
      color: "#157D18",
    },
    {
      id: 6,
      title: "Clean Water and Sanitation",
      description:
        "Pharmaceutical waste, when improperly disposed of, contaminates water bodies. PharmaBin’s structured disposal system helps protect water quality and public health.",
      color: "#00AED9",
    },
    {
      id: 12,
      title: "Responsible Consumption and Production",
      description:
        "PharmaBin promotes responsible pharmaceutical waste management, reducing environmental pollution and supporting sustainable recycling where applicable.",
      color: "#CF8D2A",
    },
  ];

  return (
    <section>
      <Navbar />
      <Header />
      <section
        className="px-4 md:px-28 py-12 md:py-20 top-32 md:top-32 relative z-10"
        style={{
          backgroundImage: "url(./bg-waste-land-1.svg)",
        }}
      >
        <div className="md:w-[50%]">
          <Badge text="About Us" bgColor="bg-tertiary" className="mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
            The Industry Leader In Pharmaceutical Waste Management
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-8">
          <div className="relative w-full md:w-[50%] h-[30rem] md:h-[50rem]">
            <Image
              src="/drugs.jpeg"
              alt="drugs"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 gap-5 text-base sm:text-base xl:text-lg h-full flex flex-col justify-between">
            <p className="text-textPrimary leading-relaxed mb-4">
              <strong>PharmaBin</strong> is an initiative dedicated to solving
              the pressing issue of pharmaceutical waste management in Nigeria.
              By integrating technology, community engagement, and environmental
              sustainability, PharmaBin provides a safe, efficient, and
              eco-friendly solution for the disposal of expired, unused, or
              contaminated medications.
              <br />
              <br />
              Our platform connects households, community pharmacies, and
              regulatory bodies, ensuring proper collection and disposal of
              pharmaceutical waste while raising awareness about its impact on
              health and the environment. With a vision to lead responsible
              waste management practices in Nigeria, <strong>
                PharmaBin
              </strong>{" "}
              is committed to fostering a cleaner, healthier, and more
              sustainable future.
              <br />
              <br /> Through technology-driven tracking and reporting, PharmaBin
              ensures that collected waste is properly handled, reducing the
              risks of environmental pollution, water contamination, and
              medication misuse.
              <br />
              <br />
              Beyond collection, PharmaBin serves as an educational hub,
              providing communities with vital information on the dangers of
              improper pharmaceutical waste disposal and promoting best
              practices for medication management.
              <br />
              <br />
              By bridging the gap between individuals, healthcare facilities,
              and regulatory bodies, PharmaBin is pioneering a safe, efficient,
              and eco-friendly approach to pharmaceutical waste disposal.
            </p>

            <Button
              variant="secondary"
              className="text-black w-max"
              href="/about-us"
            >
              More About Us
            </Button>
          </div>
        </div>
      </section>
      <section
        className="px-4 md:px-28 py-12 md:py-20 top-32 md:top-32 relative z-10"
        style={{ backgroundImage: "url(/bg-waste-land-1.svg)" }}
      >
        <div className="md:w-[50%] ml-auto">
          <Badge
            text="Sustainable Development Goals"
            bgColor="bg-tertiary"
            className="mb-8"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 ">
            Sustainable Development Goals (SDGs) Addressed By PharmaBin{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-end gap-2">
          <div className="relative w-full md:w-[50%] h-[30rem] md:h-[30rem]">
            <Image
              src="/sdg.svg"
              alt="Sustainable Development Goals Infographic"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-3">
            <p className="text-textPrimary leading-relaxed">
              <strong>PharmaBin</strong> aligns with the following three United
              Nations Sustainable Development Goals (SDGs):
              <br />
              <br />
            </p>
            {sdgData.map((sdg) => (
              <div
                key={sdg.id}
                className="flex items-start gap-2"
                style={{ borderColor: sdg.color }}
              >
                <CheckMark className={`w-16`} fill={sdg.color} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    SDG {sdg.id}: {sdg.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{sdg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="top-32 relative">
        <Carousel />
      </section>

      <section
        className="px-4 md:px-28 py-20 top-32 bg-white relative z-10"
        style={{
          backgroundImage: "url(./bg-waste-land-2.svg)",
        }}
      >
        <div className="md:w-[50%]">
          <Badge text="Why PharmaBin" bgColor="bg-tertiary" className="mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
            Why Choose PharmaBin For Your Pharmaceutical Waste Management
          </h1>
        </div>
        <DisposalDiagram />
      </section>
      <section className="top-32 relative z-40 ">
        <div className="relative">
          <div
            className="h-[50rem] "
            style={{
              backgroundImage: "url(./injections.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#023022E8]/90 via-[#157D18B8]/48 to-[#157D18B8]/90 bg-[#157D18]/60 md:bg-transparent " />
        </div>
        <section className="absolute top-[10%] md:top-[30%] left-[5%] right-[5%] bg-white rounded-lg shadow p-8 md:p-16 flex flex-col md:flex-row items-end gap-8">
          <div className="relative  w-full md:w-[50%] flex-col flex  ">
            <Badge
              text="Nearby Location"
              bgColor="bg-tertiary"
              className="mb-8 w-max"
            />{" "}
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
              Do You Want To Dispose Your Pharmaceutical Waste? Find A
              Collection Point Near You
            </h1>
            <p className="text-base sm:text-base xl:text-lg text-textPrimary leading-relaxed mb-4">
              PharmaBin is an initiative dedicated to solving the pressing issue
              of pharmaceutical waste management in Nigeria. By integrating
              technology, community engagement, and environmental
              sustainability, PharmaBin provides a safe, efficient, and
              eco-friendly solution for the disposal of expired, unused, or
              contaminated medications.
              <br />
              Our platform connects households, community pharmacies, and
              regulatory bodies, ensuring proper collection and disposal of
              pharmaceutical waste while raising awareness about its impact on
              health and the environment. With a vision to lead responsible
              waste management practices in Nigeria, PharmaBin is committed to
              fostering a cleaner, healthier, and more sustainable future.
            </p>
            <Button
              variant="secondary"
              className="text-black w-max"
              href="/collection-points"
            >
              View Locations Near You
            </Button>
          </div>
          <div className="relative hidden md:inline-block w-full md:w-[50%] h-[30rem] md:h-[40rem]">
            <Image
              src="/drugs-1.png"
              alt="drugs"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        </section>
      </section>
      <section
        className="relative pt-[26rem] sm:pt-40 md:pt-96 "
        style={{
          backgroundImage: "url(./bg-community.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center md:my-12 w-full md:w-[60%] mx-auto">
            <Badge text="Articles" bgColor="bg-tertiary" className="mb-8" />{" "}
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
              Knowledge On How To Protect Our Communities Together
            </h1>
            <p className="text-base sm:text-base xl:text-lg text-textPrimary leading-relaxed mb-4">
              Pharmaceutical waste disposal can be complex to navigate, so we
              work hard to provide answers to the questions you may have. Enter
              our Articles section to find blog posts, research papers and FAQ’s
              on compliant and effective pharmaceutical waste management.
            </p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Card
                key={index}
                id={card._id}
                image={card.articleImage1Url}
                title={card.Title}
                description={card.Caption}
              />
            ))}
          </div>
        </div>
        <div className="py-20 flex flex-col md:flex-row  gap-8 px-4 md:px-28">
          <div className="w-full md:w-1/2 gap-5 text-base sm:text-base xl:text-lg h-full">
            <Badge
              text="Frequently Asked Questions"
              bgColor="bg-tertiary"
              className="mb-8"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-tertiary3 mb-6">
              Want To Ask PharmaBin Anything? We Have Answers
            </h1>
            <p>
              PharmaBin is an initiative dedicated to solving the pressing issue
              of pharmaceutical waste management in Nigeria. By integrating
              technology, community engagement, and environmental
              sustainability, PharmaBin provides a safe, efficient, and
              eco-friendly solution for the disposal of expired, unused, or
              contaminated medications.
            </p>
          </div>
          <FaqSection />
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#157D18]/30 via-[#023022]/20 to-[#023022]/20 bg-[#023022]/10 md:bg-transparent  py-20 px-4 md:px-0 md:pr-28">
        <div className=" w-full md:w-[70%] mx-auto text-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-6 ">
            See How Pharmacies Like Yours Are Getting Ride Of Their
            Pharmaceutical Waste
          </h1>
          <DividerIcon />
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:gap-8">
          <GallerySection />
          <TestimonialSection />
        </div>
      </section>
      <CallToAction />
      <Footer />
    </section>
  );
}
