"use client";
import React, { useState } from "react";
import { CrossIcon, PlusIcon } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "../badge";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What Is PharmaEco?",
    answer: `
   PharmaEco is an AI-driven social enterprise addressing the urgent challenge of pharmaceutical waste and packaging management in Nigeria. We combine innovation, community engagement, and environmental responsibility to ensure the safe collection, recycling, and eco-friendly disposal of pharmaceutical waste. `,
  },
  {
    question: "Who can use PharmaEco’s services?",
    answer: `
   Households, pharmacies, hospitals, and healthcare institutions can all use PharmaEco to dispose of expired, unused medications and pharmaceutical packaging.`,
  },
  {
    question: "How does PharmaEco work?",
    answer: `
    Users locate nearby collection points through our digital platform, where waste is collected, tracked, and transported for proper disposal and recycling.`,
  },
  {
    question: "How can I talk to PharmaEco instantly?",
    answer: `
    Simply chat with PharmaEcoBot on WhatsApp for guidance on locating nearby collection points, safe disposal, or recycling education.`,
  },
  {
    question: "Is there a cost to use PharmaEco?",
    answer: `
    Basic collection services for individuals are free. Institutional or bulk collections may have structured pricing depending on volume in the nearest future.`,
  },
  {
    question: "How does PharmaEco ensure environmental safety?",
    answer: `
   We work with certified waste handlers and regulatory agencies to ensure all materials are disposed of responsibly.`,
  },
  {
    question: "What types of waste does PharmaEco accept?",
    answer: `
   We accept expired, unused, or damaged medicines, as well as empty blister packs, cartons, leaflets, plastics, tubes, and other pharmaceutical packaging materials for recycling and safe disposal.`,
  },
  {
    question: "Why is pharmaceutical waste recycling important?",
    answer: `
   Recycling prevents toxic waste from contaminating soil and water, reduces landfill burden, and promotes a circular economy that converts packaging waste into reusable materials.`,
  },
  {
    question: "Can I partner with PharmaEco?",
    answer: `
   Yes! We welcome collaborations from pharmacies, hospitals, NGOs, and organizations interested in sustainability.`,
  },
  {
    question: "⁠Does PharmaEco operate outside Nigeria?",
    answer: `
   Currently, we are focused on Nigeria, but we are exploring partnerships to expand to other African countries.`,
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative  px-4 lg:px-28 py-12 lg:py-20 ">
      <div className="container mx-auto ">
        <div className="text-center md:my-12 w-full md:w-[60%] mx-auto">
          <Badge
            text="FREQUENTLY ASKED QUESTIONS"
            bgColor="bg-tertiary"
            className="mb-2"
          />{" "}
          <h1 className="text-2xl md:text-4xl font-semibold text-tertiary3 mb-2">
            Want To Ask PharmaEco Anything? We Have Answers
          </h1>
          <p className="text-base sm:text-base xl:text-lg text-textPrimary leading-relaxed mb-4">
            Get clarity on how PharmaEco helps individuals, pharmacies,
            hospitals and institutions manage pharmaceutical waste safely and
            sustainably.
          </p>
        </div>
        <div className="">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b   border-gray-300 bg-transparent "
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 flex justify-between items-center text-gray-800 font-medium"
              >
                <span className="text-tertiary3 text-lg font-semibold">
                  {item.question}
                </span>
                <div className="text-2xl">
                  {activeIndex === index ? <CrossIcon /> : <PlusIcon />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="p-4 text-gray-700 border-gray-300"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
