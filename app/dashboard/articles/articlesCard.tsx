import type { ArticleResponse } from "@/lib/types";
import React from "react";
import Pagination from "@/components/pagination";
import Button from "@/components/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArticlesSectionProps {
  articles: ArticleResponse[] | undefined;
  showAddArticleButton?: boolean;
  onAddArticle?: () => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  showAddArticleButton = false,
  onAddArticle,
}) => {
  const router = useRouter();
  const onViewArticle = (id: string) => {
    router.push(`/dashboard/articles/${id}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        {showAddArticleButton && (
          <h2 className="text-xl font-semibold text-primary mb-3 md:mb-0">
            Articles
          </h2>
        )}
        {showAddArticleButton && onAddArticle && (
          <Button
            onClick={onAddArticle}
            className="!bg-black w-max text-white !px-6 !py-2 rounded-lg shadow-sm focus:outline-none "
          >
            + Add Article
          </Button>
        )}
      </div>

      {/* Articles Table */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-8 bg-white rounded-lg shadow-md">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead className="border">
            <tr>
              <th className="text-primary px-4 py-2">S/N</th>
              <th className="text-primary px-4 py-2">Date Posted</th>
              <th className="text-primary px-4 py-2">Title</th>
              <th className="text-primary px-4 py-2">Subtitle</th>
              <th className="text-primary px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article, index) => (
              <tr key={article._id} className="hover:bg-gray-50 border">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2 items-center">
                  <div className="relative md:w-20 md:h-20 w-10 h-10">
                    <Image
                      layout="fill"
                      src={article.articleImage1Url || "/"}
                      className="rounded-[100%] object-cover"
                      alt={article.articleImage1Id || "Article Image"}
                    />
                  </div>
                  <div>{article.Title}</div>
                </td>
                <td className="px-4 py-2">{article.Subtitle1}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-yellow-600 font-semibold hover:underline"
                    onClick={() => onViewArticle(article._id)}
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={1}
        totalPages={8}
        onPageChange={(page) => console.log("Page changed to:", page)}
      />
    </div>
  );
};

export default ArticlesSection;
