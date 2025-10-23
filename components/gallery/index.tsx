import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const GallerySection = () => {
  const images = ["/waste-1.svg", "/waste-2.svg", "/waste-3.svg"];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex items-center justify-center w-full h-60 ">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ zIndex: 10 - index }}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            className={`absolute rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              index === 0
                ? "left-0"
                : index === 1
                ? "left-10 md:left-20"
                : "left-20 md:left-40"
            }`}
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-64 h-64 md:w-[30rem] md:h-[25rem] object-cover rounded-lg hover:outline hover:outline-4 hover:outline-primary"
              width={320}
              height={320}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
