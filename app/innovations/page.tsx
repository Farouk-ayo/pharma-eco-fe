"use client";
import Button from "@/components/buttons";
import Header from "@/components/header/header";
import Image from "next/image";
import React from "react";

const InnovationPage = () => {
  const whatsappNumber = "2348125137920";
  const message = encodeURIComponent(
    "Hi PharmaEcoBot! 👋 I need help with pharmaceutical waste disposal."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section>
      <Header
        title="Innovations"
        bg="/bg-innovations.webp"
        description={
          <p className="text-lg text-medium text-white">
            We believe technology and science can transform how pharmaceutical
            waste is managed.
          </p>
        }
      />
      <section className="px-4 lg:px-28 py-12 lg:py-20 relative z-10 flex flex-col-reverse lg:flex-row gap-10">
        <div className="lg:w-[60%]">
          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-6 ">
            PharmaEcoBot - Smart AI Assistant
          </h1>
          <div className="relative  lg:hidden w-full h-[20rem]  mb-8">
            <Image
              src="/pharma-eco-bot-m.webp"
              alt="drugs"
              layout="fill"
              objectFit="cover"
              className="rounded-b-[120px] rounded-t-[24px]"
            />
          </div>
          <div className="w-full gap-5 text-base sm:text-base xl:text-lg h-full flex flex-col ">
            <p className="text-textPrimary leading-relaxed mb-4">
              PharmaEcoBot is accessible via WhatsApp to guide households,
              pharmacies, hospitals, and regulatory bodies to ensure that
              pharmaceutical waste is properly handled and that recyclable
              materials are repurposed to reduce pollution and promote circular
              economy practices.
            </p>

            <Button
              variant="primary"
              size="actionBtn"
              className="text-black w-max"
              href={whatsappLink}
            >
              Say Hi To PharmaEcoBot
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:inline-block  lg:w-[40%]  lg:h-[28rem]">
          <Image
            src="/pharma-eco-bot-m.webp"
            alt="drugs"
            layout="fill"
            objectFit="cover"
            className="rounded-b-[120px] rounded-t-[24px]"
          />
        </div>
      </section>
      <section className="px-4 lg:px-28 py-12 lg:py-20 relative z-10 flex flex-col-reverse lg:flex-row gap-10">
        <div className="relative hidden lg:inline-block  lg:w-[40%]  lg:h-[28rem]">
          <Image
            src="/pharma-eco-bot-guard.webp"
            alt="pharmaecobot guard"
            layout="fill"
            objectFit="fill"
            className="rounded-b-[120px] rounded-t-[24px]"
          />
        </div>
        <div className="lg:w-[60%]">
          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-6 ">
            PharmaEcoGuard EMR - Smart Pharmacy Care, Pharmacovigilance &
            Eco-Safety Platform
          </h1>
          <div className="relative  lg:hidden w-full h-[20rem]  mb-8">
            <Image
              src="/pharma-eco-bot-guard.webp"
              alt="pharmaecobot guard"
              layout="fill"
              objectFit="fill"
              className="rounded-b-[120px] rounded-t-[24px]"
            />
          </div>
          <div className="w-full gap-5 text-base sm:text-base xl:text-lg h-full flex flex-col ">
            <p className="text-textPrimary leading-relaxed mb-4">
              PharmaEcoGuard EMR is a unified system that help pharmacies to
              improve patient safety, documents care, and protects the
              environment. It improves medication safety, streamline pharmacy
              workflow, track and guide pharmaceutical waste disposal, reduce
              environmental contamination, and educate patients on medication
              safety & proper disposal of unused and expired drugs.
            </p>

            <Button
              variant="primary"
              size="actionBtn"
              className="text-black w-max"
              href={"/pharmaeco-guard/auth/signup"}
            >
              Check It Out
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default InnovationPage;
