"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowRightIcon,
  FacebookIcon2,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icons";
import Button from "@/components/buttons";
import Link from "next/link";
import { useGetArticle, useGetArticles } from "@/lib/hooks/api/queries";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Carousel from "@/components/carousel";
import { formatDateToString } from "@/lib/util";

const socialLinks = [
  {
    name: "WhatsApp",
    link: `https://wa.me/?text=${encodeURIComponent(
      "Check this out: " + window.location.href
    )}`,
    simpleIcon: (
      <WhatsappIcon stroke="#25D366" fill="#25D366" className="h-5 w-5" />
    ),
  },
  {
    name: "Facebook",
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`,
    simpleIcon: <FacebookIcon2 fill="#0866FF" />,
  },
  {
    name: "X",
    link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check this out: " + window.location.href
    )}`,
    simpleIcon: <TwitterIcon fill="#000000" />,
  },
];

const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, isPending } = useGetArticle(id as string);
  console.log(article);
  const { data: articles } = useGetArticles();

  if (isPending) {
    return <LoadingSkeleton count={1} type="ArticleID" />;
  }
  return (
    <section className=" relative  top-28  md:top-40 px-4 lg:px-28 pb-40 items-center overflow-hidden">
      <div>
        <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center my-4 ">
          <div className=" hidden md:flex md:items-center text-sm text-textPrimary mb-4">
            <Link className="" href={"/articles"}>
              {" "}
              <span className="text-primary">Articles</span>
            </Link>
            <ArrowRightIcon className="h-2 w-2 mx-2" />
            <span>{article?.Title}</span>
          </div>
          <div className="flex items-center  gap-2">
            <span className="text-primary">Share via:</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className=""
                title={`Share via ${social.name}`}
              >
                {social.simpleIcon}
              </a>
            ))}
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {article?.Title}
        </h1>
        <p className="text-textPrimary mb-6 ">
          {" "}
          <span>
            {" "}
            {article?.createdAt && formatDateToString(article.createdAt)}
          </span>
          <span>-</span>{" "}
          <span className="text-primary font-semibold block md:inline ">
            Written by {article?.Author}
          </span>
        </p>
        <div className="w-full aspect-[21/9] md:h-[20rem] relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={article?.articleImage1Url || "/placeholder.jpg"}
            alt={article?.Title || "Article image"}
            fill
            priority
            className="object-cover object-left md:object-center rounded-lg h-full w-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none  mt-6">
            <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              {article?.Subtitle1}
            </h2>
            <div
              className="text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: article?.Content1 || "" }}
            />{" "}
          </div>

          {article?.Content2 && (
            <div className="prose max-w-none  mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                {article?.Subtitle2}
              </h2>

              <div
                className="text-gray-700 "
                dangerouslySetInnerHTML={{ __html: article?.Content2 || "" }}
              />
              {article?.articleImage2Url && (
                <div className="relative w-full  overflow-hidden h-[20rem] rounded-lg">
                  <Image
                    src={article?.articleImage2Url || "/placeholder.jpg"}
                    alt={article?.Title || "Article image"}
                    fill
                    priority
                    className="object-contain sm:object-cover rounded-lg h-full w-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {article?.Content3 && (
            <div className="prose max-w-none  mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                {article?.Subtitle3}
              </h2>

              <div
                className="text-gray-700 mb-8"
                dangerouslySetInnerHTML={{ __html: article?.Content3 || "" }}
              />
              {/* Waste Bins Image */}
              {article?.articleImage3Url && (
                <div className="relative bg-sky-100 w-full h-[28rem] rounded-lg mb-8">
                  <Image
                    src={article?.articleImage3Url || "/"}
                    alt="Hands-Free Waste Disposal"
                    layout="fill"
                    priority
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          )}
          {article?.Content4 && (
            <div className="prose max-w-none  mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                {article?.Subtitle4}
              </h2>

              <div
                className="text-gray-700 mb-8"
                dangerouslySetInnerHTML={{ __html: article?.Content4 || "" }}
              />
              {/* Waste Bins Image */}
              {article?.articleImage4Url && (
                <div className="relative bg-sky-100 w-full h-[28rem] rounded-lg mb-8">
                  <Image
                    src={article?.articleImage4Url || "/"}
                    alt="Hands-Free Waste Disposal"
                    layout="fill"
                    priority
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Takes up 1 column */}
        <div className="lg:col-span-1 ">
          <div className="mb-8 p-4 border rounded-lg border-gray-300">
            <h3 className="font-semibold mb-4 md:text-xl ">Related Posts</h3>
            <ul className="space-y-3">
              {articles &&
                articles.map((post, index) => (
                  <li key={index} className="border-b border-gray-300">
                    <a
                      href={`/articles/${post._id}`}
                      className="text-gray-700 hover:text-primary transition-colors block"
                    >
                      {post.Title}
                    </a>
                  </li>
                ))}
            </ul>
            <a
              href={`/articles`}
              className="text-primary font-semibold hover:underline flex items-center mt-2"
            >
              See More Articles{" "}
              <span className="ml-2 text-primary ">&rarr;</span>
            </a>
          </div>

          {/* Testimonial */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            <Carousel vertical={true} />
          </div>
          {/* Newsletter Subscription */}
          <div className="bg-primary/10 p-6 rounded-lg text-center mb-8">
            <h3 className="font-semibold mb-2 text-lg md:text-2xl ">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Tips, stories, and new approaches to work management,
              collaboration, and productivity. Get them weekly to your inbox.
            </p>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-2 mb-2 border rounded"
            />
            <Button variant="primary" className="w-full text-white">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
