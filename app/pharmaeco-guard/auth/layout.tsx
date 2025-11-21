import { VerticalLine } from "@/components/icons";
import Navbar from "@/components/navbar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "PharmaEcoGuard EMR",
  description: "Smart Pharmacy Care, Pharmacovigilance & Eco-Safety Platform",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />
      <section className="h-full w-full mb-40 top-24 relative md:px-4 lg:px-16">
        <div className="flex flex-col lg:flex-row-reverse h-full">
          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 bg-white px-4 md:px-10 p-10">
            <div className="">
              <div className="flex flex-col gap-4 mb-5 ">
                <Link href="/">
                  <div className="relative w-48 md:w-52 h-20 hidden lg:inline-block">
                    <Image
                      src="/pharma-eco-guard.svg"
                      alt="pharmaeco"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className="w-full relative">{children}</div>
            </div>{" "}
          </div>
          {/* Left Side - Info */}
          <div className="px-4 lg:px-10 py-12 lg:py-20  z-10  flex-col-reverse lg:flex-row gap-10 relative w-full lg:w-1/2  hidden lg:inline-block bg-primary/15 items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primaryDark mb-2">
              PharmaEcoGuard EMR
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
              Smart Pharmacy Care, Pharmacovigilance & Eco-Safety Platform
            </h2>
            <p className="text-base lg:text-lg text-textPrimary mb-8 leading-relaxed">
              PharmaEcoGuard EMR is a unified system that help pharmacies to
              improve patient safety, documents care, and protects the
              environment. It improves medication safety, streamline pharmacy
              workflow, track and guide pharmaceutical waste disposal, reduce
              environmental contamination, and educate patients on medication
              safety & proper disposal of unused and expired drugs.
            </p>

            {/* Feature Breakdown */}
            <div className="flex justify-between items-start gap-2 mt-12">
              <div className="flex flex-col items-center text-center">
                <p className="text-sm md:text-base font-bold text-[#B1033E] mb-2">
                  Pharma
                </p>
                <VerticalLine color={"#B1033E"} fill={"#B1033E"} />
                <p className="text-xs md:text-sm text-[#B1033E] mt-2">
                  Medication
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-sm md:text-base font-bold text-primary mb-2">
                  Eco
                </p>
                <VerticalLine color={"#2AA84A"} fill={"#2AA84A"} />
                <p className="text-xs md:text-sm text-primary mt-2">
                  Environmental
                </p>
                <p className="text-xs md:text-sm text-[#2AA84A]">Protection</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-sm md:text-base font-bold text-[#FF8000] mb-2">
                  Guard
                </p>
                <VerticalLine color={"#FF8000"} fill={"#FF8000"} />
                <p className="text-xs md:text-sm text-[#FF8000] mt-2">Safety</p>
                <p className="text-xs md:text-sm text-[#FF8000]">
                  (Clinical + Environmental)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <p className="text-sm md:text-base font-bold text-[#BD01D2] mb-2">
                  EMR
                </p>
                <VerticalLine color={"#BD01D2"} fill={"#BD01D2"} />
                <p className="text-xs md:text-sm text-[#BD01D2] mt-2">
                  Electronic Medical
                </p>
                <p className="text-xs md:text-sm text-[#BD01D2]">Record</p>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </section>
  );
};

export default Layout;
