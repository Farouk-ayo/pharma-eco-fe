"use client";
import React, { useState } from "react";
import { CrossIcon, PlusIcon } from "../icons";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What Is PharmaBin?",
    answer: `
   <strong>PharmaBin</strong> is an initiative dedicated to solving the pressing issue of pharmaceutical waste management in Nigeria. By integrating technology, community engagement, and environmental sustainability, <strong>PharmaBin</strong> provides a safe, efficient, and eco-friendly solution for the disposal of expired, unused, or contaminated medications`,
  },
  {
    question: "Why is proper pharmaceutical waste disposal important?",
    answer: `
   Improper disposal can harm the environment, contribute to antimicrobial resistance, and pose health risks through accidental ingestion or drug misuse.`,
  },
  {
    question: "Where can I drop off my unused or expired medicines?",
    answer: `
    You can find a registered collection point near you through our website.`,
  },
  {
    question: "What types of pharmaceutical waste can be disposed of?",
    answer: `
    Expired medicines, Leftover drugs, Unused drugs such as blisters, IV fluids, and other pharmaceutical-related waste.`,
  },
  {
    question: "What happens to the collected pharmaceutical waste?",
    answer: `
    A licensed waste disposal company collects the waste and ensures safe disposal in line with NAFDAC regulations.`,
  },
  {
    question:
      "Will incentives be available for me when i return my pharmaceutical waste?",
    answer: `
   Yes, but for now, there are no incentives. With time we will start to give incentives to those that return their pharmaceutical waste to the nearest pharmaceutical waste collection point.`,
  },
  {
    question:
      "Can I Get to know the nearest participating pharmacies In my environment?",
    answer: `
   Yes, you will be able to know the nearest waste collection point in your environment. Just come to the PharmaBin website and you will be able to search for the locations near you.`,
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-transparent">
      <div className="">
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
