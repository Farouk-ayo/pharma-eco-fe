"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ArticleForm from "../articleForm";
import Modal from "@/components/modal/modalConfirmation";
import { useGetArticle } from "@/lib/hooks/api/queries";
import { ArticleCard } from "@/lib/types";
import { useDeleteArticle, usePatchArticle } from "@/lib/hooks/api/mutations";

export default function ViewArticlePage() {
  const { id } = useParams();
  const { data: article, isLoading: isFetching } = useGetArticle(id as string);
  console.log(article);
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle();
  const router = useRouter();

  const patchArticle = usePatchArticle(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: ArticleCard) => {
    patchArticle.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/articles");
      },
    });
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    deleteArticle(id as string, {
      onSuccess: () => {
        router.push("/dashboard/articles");
      },
    });
  };

  return (
    <>
      <ArticleForm
        onSubmit={handleSubmit}
        initialData={article}
        isFetching={isFetching}
        isLoading={isDeleting || patchArticle.isPending}
        onDelete={openDeleteModal}
        type="view"
      />

      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isConfirmLoading={isDeleting}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
