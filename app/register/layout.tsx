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
  title: "Register || Pharmabin",
  description: " Register page",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <section className="h-full w-full mb-40 top-24 relative md:px-4 lg:px-28">
        <div className="flex flex-col lg:flex-row-reverse h-full">
          <div className="w-full lg:w-1/2 bg-white px-4 lg:py-8 lg:p-10 ">
            <div className="">
              <div className="flex flex-col gap-4 ">
                <Link href="/">
                  <div className="relative w-48 md:w-52 h-20 hidden lg:inline-block">
                    <Image
                      src="/pharmabin-logo.svg"
                      alt="pharmabin"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
                <h1 className="text-2xl text-center lg:text-left font-semibold lg:text-xl">
                  Join PharmaBin For Free Today
                </h1>
              </div>
              <div className="w-full relative">{children}</div>
            </div>
          </div>{" "}
          <div className="relative w-full lg:w-1/2 h-[800px] hidden lg:inline-block">
            <Carousel vertical={true} />
          </div>
        </div>
      </section>{" "}
    </section>
  );
};

export default Layout;
