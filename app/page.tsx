"use client";
import Badge from "@/components/badge";
import Button from "@/components/buttons";
import { Card } from "@/components/cards/articlesCard";
import TestimonialSection from "@/components/carousel/testimonial";
import DisposalDiagram from "@/components/disposalDiagram";
import Footer from "@/components/footer";
import CallToAction from "@/components/footer/callToAction";
import Header from "@/components/header";
import { CheckMark } from "@/components/icons";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Navbar from "@/components/navbar";
import { sdgData } from "@/lib/data";
import { useGetArticles } from "@/lib/hooks/api/queries";
import Image from "next/image";
import { LineConnector } from "./articles/page";

export default function Home() {
  const { data: articles, isPending } = useGetArticles();
  const cards = articles?.slice(0, 3) || [];

  return (
    <section>
      <Navbar />
      <Header />
      <section className="px-4 lg:px-28 py-12 lg:py-20 relative z-10 flex flex-col-reverse lg:flex-row gap-10">
        <div className="lg:w-[50%]">
          <Badge text="Our Story" className="mb-2" />

          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-6 ">
            How We Are Pioneering The Future Of Pharmaceutical Waste Management{" "}
          </h1>
          <div className="relative  lg:hidden w-full h-[30rem]  mb-8">
            <Image
              src="/drugs.png"
              alt="drugs"
              layout="fill"
              objectFit="cover"
              className="rounded-b-[120px] rounded-t-[24px]"
            />
          </div>
          <div className="w-full gap-5 text-base sm:text-base xl:text-lg h-full flex flex-col ">
            <p className="text-textPrimary leading-relaxed mb-4">
              PharmaEco is a pioneering initiative tackling the growing problem
              of pharmaceutical waste and packaging disposal in Nigeria. We
              leverage AI technology, education, and partnerships to create an
              efficient, safe, and eco-friendly system for the collection,
              recycling, and disposal of unused, expired, or contaminated
              medicines and packaging materials including blister packs,
              cartons, leaflets, plastics, tubes and others.
              <br />
              <br />
              Our platform connects households, pharmacies, hospitals, and
              regulatory bodies to ensure that pharmaceutical waste is properly
              handled and that recyclable materials are repurposed to reduce
              pollution and promote circular economy practices. Through
              PharmaEcoBot, our AI-powered assistant on WhatsApp, users can
              instantly: Locate nearby collection points, learn how to dispose
              of waste safely, get instant recycling updates and health
              education tips and report improper disposal or environmental
              hazards
              <br />
              <br />
              Our vision is to lead Nigeria and Africa toward a future where
              pharmaceutical waste and packaging are managed responsibly and
              sustainably fostering a cleaner, healthier, and circular economy.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="text-black w-max"
              href="/about-us"
            >
              More About Us
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:inline-block  lg:w-[50%]  lg:h-[45rem]">
          <Image
            src="/drugs.png"
            alt="drugs"
            layout="fill"
            objectFit="cover"
            className="rounded-b-[120px] rounded-t-[24px]"
          />
        </div>
      </section>
      <section className="px-4 lg:px-28 py-12 lg:py-20 top-32 lg:top-32 relative z-10 bg-primaryLight">
        <div className="text-center lg:my-12 w-full lg:w-[60%] mx-auto">
          <Badge text="SUSTAINABLE DEVELOPMENT GOALS" className="mb-2" />{" "}
          <h1 className="text-2xl   lg:text-4xl font-semibold text-tertiary3 mb-6 ">
            How PharmaEco Aligned With The United Nations Sustainable
            Development Goals (SDGs){" "}
          </h1>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 items-center lg:items-start gap-6 lg:gap-4">
          {/* Left column - first 4 SDGs (desktop only) */}
          <div className="hidden lg:block lg:space-y-3">
            {sdgData.slice(0, 4).map((sdg) => (
              <div
                key={sdg.id}
                className="flex items-start gap-2"
                style={{ borderColor: sdg.color }}
              >
                <CheckMark className={`flex-shrink-0`} fill={sdg.color} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    SDG {sdg.id}: {sdg.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{sdg.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Image */}
          <div className="relative w-full h-[25rem] lg:h-[35rem] flex items-center justify-center">
            <Image
              src="/sdg.svg"
              alt="Sustainable Development Goals Infographic"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>

          {/* Right column - last 3 SDGs (desktop only) */}
          <div className="hidden lg:block lg:space-y-3">
            {sdgData.slice(4).map((sdg) => (
              <div
                key={sdg.id}
                className="flex items-start gap-2"
                style={{ borderColor: sdg.color }}
              >
                <CheckMark className={`flex-shrink-0`} fill={sdg.color} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    SDG {sdg.id}: {sdg.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{sdg.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile - All SDGs below image */}
          <div className="w-full space-y-3 lg:hidden">
            {sdgData.map((sdg) => (
              <div
                key={sdg.id}
                className="flex items-start gap-2"
                style={{ borderColor: sdg.color }}
              >
                <CheckMark className={` flex-shrink-0`} fill={sdg.color} />
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

      <section className="px-4 md:px-28 py-20 top-32 bg-white relative z-10">
        <div className="md:w-[50%]">
          <Badge text="Why Choose Us" bgColor="bg-tertiary" className="mb-2" />
          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-2">
            Why Choose PharmaEco For Your Pharmaceutical Waste Management
          </h1>
        </div>
        <DisposalDiagram />
      </section>

      <section className="bg-primary/15 relative  px-4 lg:px-28 pt-12 lg:pt-20 top-32 lg:top-32 ">
        <div className="text-center lg:my-12 w-full lg:w-[60%] mx-auto">
          <Badge text="TESTIMONIALS" bgColor="bg-tertiary" className="mb-2" />
          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-2">
            What People Are Saying About PharmaEco
          </h1>
        </div>

        <div className="relative mt-4">
          <div
            className="absolute inset-0 w-full h-full object-contain lg:object-none"
            style={{
              backgroundImage: "url(./bg-testimonial.svg)",
            }}
          />

          <TestimonialSection />
        </div>
      </section>
      <section className="relative  px-4 lg:px-28 py-12 lg:py-20 top-32 lg:top-32">
        <div className="container mx-auto px-6">
          <div className="text-center md:my-12 w-full md:w-[60%] mx-auto">
            <Badge text="Articles" bgColor="bg-tertiary" className="mb-2" />{" "}
            <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-2">
              How We Are Redefining Access To Pharmaceutical Waste Through
              Knowledge
            </h1>
            <p className="text-base sm:text-base xl:text-lg text-textPrimary leading-relaxed mb-4">
              Explore inspiring stories, innovations, and AI-driven insights on
              pharmaceutical waste recycling, sustainability, and
              community-driven environmental action. Pharmaceutical waste safe
              disposal can be complex to navigate, so we work hard to provide
              answers to the questions you may have.
            </p>
          </div>

          {!isPending && (
            <div className="hidden lg:grid lg:grid-cols-3 md:mt-20">
              {cards.slice(0, 3).map((_, index) => (
                <LineConnector key={index} number={index + 1} />
              ))}
            </div>
          )}

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isPending ? (
              <LoadingSkeleton type="card" />
            ) : (
              cards.map((card, index) => (
                <Card
                  key={index}
                  id={card._id}
                  image={card.articleImage1Url}
                  title={card.Title}
                  description={card.Caption}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </section>
  );
}
