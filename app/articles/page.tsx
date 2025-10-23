"use client";
import { Card } from "@/components/cards";
import Header from "@/components/header/header";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Pagination from "@/components/pagination";
import { cards } from "@/lib/data";
import { useGetArticles } from "@/lib/hooks/api/queries";
import React, { useState } from "react";

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
        description={
          <p className="text-lg text-medium text-white">
            Pharmaceutical waste disposal can be complex to navigate, so we work
            hard to provide answers to the questions you may have. Enter our
            Articles section to find blog posts, research papers and FAQ’s on
            compliant and effective pharmaceutical waste management.
          </p>
        }
      />{" "}
      <section className="px-4  py-12 lg:px-28 md:py-20 relative z-10 my-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending ? (
            <LoadingSkeleton type="card" />
          ) : (
            currentData.map((item, index) => (
              <Card
                key={index}
                image={item.articleImage1Url}
                title={item.Title}
                description={item.Caption}
                id={item._id}
              />
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
