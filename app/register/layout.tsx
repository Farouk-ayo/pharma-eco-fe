import Carousel from "@/components/carousel";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Register || PharmaEco",
  description: " Register page",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <section className="h-full w-full mb-40 top-24 relative md:px-4 lg:px-28">
        <div className="flex flex-col lg:flex-row-reverse h-full">
          <div className="w-full lg:w-1/2 bg-white px-4 p-10">
            <div className="">
              <div className="flex flex-col gap-4 ">
                <Link href="/">
                  <div className="relative w-48 md:w-52 h-20 hidden lg:inline-block">
                    <Image
                      src="/pharma-eco-logo.svg"
                      alt="pharmabin"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
                <h1 className="text-2xl text-center lg:text-left font-semibold lg:text-xl">
                  Dispose For Free With PharmaEco Today
                </h1>
              </div>
              <div className="w-full relative">{children}</div>
            </div>
          </div>{" "}
          <div className="px-4 lg:px-10 py-12 lg:py-20  z-10  flex-col-reverse lg:flex-row gap-10 relative w-full lg:w-1/2  hidden lg:inline-block bg-primary/15">
            <h1 className="text-2xl md:text-4xl font-bold text-tertiary3 mb-6 ">
              Reimagining Pharmaceutical Waste Through{" "}
              <span className="text-secondary">Recycling</span> and{" "}
              <span className="text-secondary">Circular Economy</span>
            </h1>
            <p className="text-lg text-medium mb-6 ">
              PharmaEco is an AI-driven social enterprise addressing the urgent
              challenge of pharmaceutical waste and packaging management in
              Nigeria. We combine innovation, community engagement, and
              environmental responsibility to ensure the safe collection,
              recycling, and eco-friendly disposal of pharmaceutical waste.
            </p>
            <Carousel />
          </div>
        </div>
      </section>{" "}
    </section>
  );
};

export default Layout;
