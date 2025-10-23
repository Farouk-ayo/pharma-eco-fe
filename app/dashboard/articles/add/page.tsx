"use client";
import { usePostArticle } from "@/lib/hooks/api/mutations";
import ArticleForm from "../articleForm";
import { ArticleCard } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AddArticlePage() {
  const postArticle = usePostArticle();
  const router = useRouter();

  const handleSubmit = async (data: ArticleCard) => {
    postArticle.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/articles");
      },
    });
  };

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      isLoading={postArticle.isPending}
      type="add"
    />
  );
}
