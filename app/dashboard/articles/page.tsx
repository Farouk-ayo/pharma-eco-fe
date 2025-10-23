"use client";

import React from "react";
import ArticlesSection from "./articlesCard";
import { useGetArticles } from "@/lib/hooks/api/queries";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { useRouter } from "next/navigation";

const ArticlesPage = () => {
  const { data: articles, isPending: isLoadingArticles } = useGetArticles();
  const router = useRouter();

  const handleAddArticle = () => {
    router.push("/dashboard/articles/add");
  };

  return (
    <div className="md:py-14 py-10 px-4 md:px-8 space-y-6">
      {isLoadingArticles ? (
        <LoadingSkeleton count={10} type="table" />
      ) : (
        <ArticlesSection
          articles={articles}
          showAddArticleButton={true}
          onAddArticle={handleAddArticle}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
