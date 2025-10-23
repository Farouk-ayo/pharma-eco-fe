"use client";
import Button from "@/components/buttons";
import Navbar from "@/components/navbar";
import TopBar from "@/components/navbar/topBar";
import Image from "next/image";

const NotFound = () => {
  return (
    <section className="w-full">
      <Navbar />
      <TopBar />
      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen bg-gradient-to-b from-[#eafbf500] to-[#157D1861] px-6 md:px-16 lg:px-28 w-full py-20">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-lg lg:max-w-xl">
          <h1 className="text-6xl md:text-9xl font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you’re looking for does not exist or has been moved.
            Please go back to the Home page.
          </p>
          <Button href="/" variant="secondary" className="">
            Go Back Home
          </Button>
        </div>

        {/* Right Content */}
        <div className="relative flex-shrink-0 w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/404.svg"
            alt="404 Error Icon"
            className="object-contain"
            layout="fill"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
