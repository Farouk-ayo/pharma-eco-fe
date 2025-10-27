"use client";
import { Card } from "@/components/cards/articlesCard";
import Header from "@/components/header/header";
import { HorizontalLine, VerticalLine } from "@/components/icons";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Pagination from "@/components/pagination";
import { cards } from "@/lib/data";
import { useGetArticles } from "@/lib/hooks/api/queries";
import React, { useState } from "react";

export const LineConnector = ({ number }: { number: number }) => (
  <div className="relative flex items-center justify-center w-full h-12 mb-4">
    {/* Vertical line from top */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2">
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full  z-20 text-white flex items-center justify-center font-bold text-3xl scale-100`}
        style={{
          backgroundColor: "#009D3D",
          boxShadow: `0 0 0 6px #009D3D50 `,
        }}
      >
        {number}
      </div>
      <VerticalLine />
    </div>
    {/* Horizontal line extending left and right */}
    <HorizontalLine className="relative -top-6 left-0  " />
  </div>
);

const AboutUs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const { data: articles, isPending } = useGetArticles();

  const currentData = articles
    ? articles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <section className="">
      <Header
        title="Read Articles"
        bg="/bg-articles.jpg"
        description={
          <p className="text-lg text-medium text-white">
            Explore inspiring stories, innovations, and insights on
            pharmaceutical waste recycling, sustainability, and community-driven
            environmental action. Pharmaceutical waste safe disposal can be
            complex to navigate, so we work hard to provide answers to the
            questions you may have.
          </p>
        }
      />{" "}
      <section className="px-4  py-12 lg:px-28 md:py-20 relative z-10 my-32">
        {" "}
        {!isPending && (
          <div className="hidden lg:grid lg:grid-cols-3  mb-0">
            {currentData.slice(0, 3).map((_, index) => (
              <LineConnector
                key={index}
                number={(currentPage - 1) * itemsPerPage + index + 1}
              />
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending ? (
            <LoadingSkeleton type="card" />
          ) : (
            currentData.map((item, index) => (
              <div key={item._id || index} className="relative">
                <Card
                  key={index}
                  image={item.articleImage1Url}
                  title={item.Title}
                  description={item.Caption}
                  id={item._id}
                />{" "}
              </div>
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </section>
    </section>
  );
};

export default AboutUs;
