"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowRightIcon,
  FacebookIcon2,
  WhatsappIcon2,
  XIcon2,
} from "@/components/icons";
import Link from "next/link";
import { useGetArticle, useGetArticles } from "@/lib/api/queries";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { formatDateToString } from "@/lib/util";

const socialLinks = [
  {
    name: "WhatsApp",
    link: `https://wa.me/?text=${encodeURIComponent(
      "Check this out: " + window.location.href
    )}`,
    simpleIcon: <WhatsappIcon2 />,
  },
  {
    name: "Facebook",
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`,
    simpleIcon: <FacebookIcon2 />,
  },
  {
    name: "X",
    link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check this out: " + window.location.href
    )}`,
    simpleIcon: <XIcon2 />,
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
    <section className=" relative  top-16  md:top-20  pb-40 items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-80 md:h-[60vh] bg-[#ECFFF099] px-4 lg:px-20 " />
      <div className="relative z-20 px-4 lg:px-20">
        <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center my-10 ">
          <div className=" hidden md:flex md:items-center text-lg text-textPrimary mb-4">
            <Link className="" href={"/articles"}>
              {" "}
              <span className="text-primary font-semibold">Articles</span>
            </Link>
            <ArrowRightIcon className="h-2 w-2 mx-2" />
            <span>{article?.title}</span>
          </div>
          <div className="flex items-center  gap-2">
            <span className="text-primary font-semibold">Share via:</span>
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

        <h1 className="text-2xl font-semibold md:text-5xl text-primaryDark">
          {article?.title}
        </h1>
        <p className="text-textPrimary mb-6 ">
          {" "}
          <span>
            {" "}
            {article?.createdAt && formatDateToString(article.createdAt)}
          </span>
          <span>-</span>{" "}
          <span className="text-primary font-semibold block md:inline ">
            Written by {article?.author}
          </span>
        </p>
        <div className="w-full aspect-[21/9] md:h-[40rem] relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={article?.articleImage1Url || "/placeholder.jpg"}
            alt={article?.title || "Article image"}
            fill
            priority
            className="object-cover object-top md:object-top rounded-lg h-full w-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
      </div>

      <div className=" px-4 lg:px-20 relative grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none  mt-6">
            <div
              className="text-gray-700 text-base md:text-xl mb-8 leading-8"
              dangerouslySetInnerHTML={{ __html: article?.introduction || "" }}
            />
          </div>
        </div>

        {/* Sidebar - Takes up 1 column */}
        <div className="lg:col-span-1 hidden md:inline-block">
          <div className="mb-8 p-4 border rounded-lg border-gray-300">
            <h3 className="font-semibold mb-4 md:text-xl text-primaryDark ">
              Related Posts
            </h3>
            <ul className="space-y-3">
              {articles &&
                articles.map((post, index) => (
                  <li key={index} className="border-b border-gray-300">
                    <a
                      href={`/articles/${post._id}`}
                      className="text-primaryDark hover:text-primary transition-colors block"
                    >
                      {post.title}
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
        </div>
      </div>
      {article?.content1 && (
        <div className="prose max-w-none  mt-6 px-4 lg:px-20">
          <h2 className="text-xl md:text-4xl font-semibold text-primary mb-4">
            {article?.subtitle1}
          </h2>
          <div
            className="text-gray-700 text-base md:text-xl leading-8 font-normal "
            dangerouslySetInnerHTML={{ __html: article?.content1 || "" }}
          />
        </div>
      )}
      {article?.content2 && (
        <div className="prose max-w-none  mt-6 py-10 bg-[#F1F1F180] px-4 lg:px-20">
          <h2 className="text-xl md:text-4xl font-semibold text-primary mb-4">
            {article?.subtitle2}
          </h2>

          <div
            className="text-gray-700 text-base md:text-xl leading-8 font-normal  "
            dangerouslySetInnerHTML={{ __html: article?.content2 || "" }}
          />
        </div>
      )}
      {article?.content3 && (
        <div className="prose px-4 lg:px-20 max-w-none  mt-6 flex flex-col-reverse lg:flex-row-reverse gap-10">
          <div className="lg:w-[60%] ">
            {" "}
            <h2 className="text-xl md:text-4xl font-semibold text-primary mb-4">
              {article?.subtitle3}
            </h2>
            <div
              className="text-gray-700 text-base md:text-xl leading-8 font-normal "
              dangerouslySetInnerHTML={{ __html: article?.content3 || "" }}
            />
          </div>
          <div className="relative lg:w-[40%]  h-full overflow-hidden">
            {article?.articleImage2Url && (
              <div className="relative bg-sky-100 w-full h-[28rem] rounded-md mb-8">
                <Image
                  src={article?.articleImage2Url || "/"}
                  alt="Hands-Free Waste Disposal"
                  layout="fill"
                  priority
                  className=" rounded-md"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {article?.content4 && (
        <div className="prose px-4 lg:px-20 max-w-none  mt-6 flex flex-col-reverse lg:flex-row gap-10">
          <div className="lg:w-[60%] ">
            {" "}
            <h2 className="text-xl md:text-4xl font-semibold text-primary mb-4">
              {article?.subtitle4}
            </h2>
            <div
              className="text-gray-700 text-base md:text-xl leading-8 font-normal "
              dangerouslySetInnerHTML={{ __html: article?.content4 || "" }}
            />
          </div>
          <div className="relative lg:w-[40%]  h-full overflow-hidden">
            {article?.articleImage3Url && (
              <div className="relative bg-sky-100 w-full h-[28rem] rounded-md mb-8">
                <Image
                  src={article?.articleImage3Url || "/"}
                  alt="Hands-Free Waste Disposal"
                  layout="fill"
                  priority
                  className=" rounded-md"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className=" px-4 lg:px-20">
        {article?.articleImage4Url && (
          <div className="relative bg-sky-100 w-full h-[20rem] md:h-[49rem] rounded-lg my-8">
            <Image
              src={article?.articleImage4Url || "/"}
              alt="Hands-Free Waste Disposal"
              layout="fill"
              priority
              className="rounded-md"
              objectFit="cover"
            />
          </div>
        )}
      </div>

      {article?.content5 && (
        <div className="prose max-w-none px-4 lg:px-20  mt-6">
          <h2 className="text-xl md:text-4xl font-semibold text-primary mb-4">
            {article?.subtitle5}
          </h2>

          <div
            className="text-gray-700 text-base md:text-xl leading-8 font-normal "
            dangerouslySetInnerHTML={{ __html: article?.content5 || "" }}
          />
          {/* Waste Bins Image */}
          {article?.articleImage5Url && (
            <div className="relative bg-sky-100 w-full h-[20rem] rounded-lg mb-8">
              <Image
                src={article?.articleImage5Url || "/"}
                alt="Hands-Free Waste Disposal"
                layout="fill"
                priority
                objectFit="cover"
              />
            </div>
          )}
        </div>
      )}
      {article?.references && (
        <div className="prose max-w-none  mt-6  px-4 lg:px-20">
          <h2 className="text-xl md:text-xl font-semibold text-primary mb-4">
            Reference(s)
          </h2>

          <div
            className="text-gray-700 text-base md:text-xl leading-8 font-normal break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: article?.references || "" }}
          />
        </div>
      )}
      <div className=" md:hidden inline-block m-2 md:m-0">
        <div className="mb-8 p-4 border rounded-lg border-gray-300">
          <h3 className="font-semibold mb-4 md:text-xl text-primaryDark ">
            Related Posts
          </h3>
          <ul className="space-y-3">
            {articles &&
              articles.map((post, index) => (
                <li key={index} className="border-b border-gray-300">
                  <a
                    href={`/articles/${post._id}`}
                    className="text-primaryDark hover:text-primary transition-colors block"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
          </ul>
          <a
            href={`/articles`}
            className="text-primary font-semibold hover:underline flex items-center mt-2"
          >
            See More Articles <span className="ml-2 text-primary ">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
