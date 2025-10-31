"use client";
import { Card } from "@/components/cards/articlesCard";
import Header from "@/components/header/header";
import { HorizontalLine } from "@/components/icons";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Pagination from "@/components/pagination";
import { cards } from "@/lib/data";
import { useGetArticles } from "@/lib/hooks/api/queries";
import React, { useState } from "react";

const Articles = () => {
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
          <div className="hidden lg:block relative w-full -mb-8">
            <HorizontalLine className="w-full" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending ? (
            <LoadingSkeleton type="card" />
          ) : (
            currentData.map((item, index) => (
              <div key={item._id || index} className="relative">
                <Card
                  backgroundColor="#009D3D"
                  key={index}
                  image={item.articleImage1Url}
                  title={item.Title}
                  description={item.Caption}
                  num={index + 1}
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

export default Articles;
