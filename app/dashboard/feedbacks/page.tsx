"use client";

import React, { useState } from "react";
import LoadingSkeleton from "@/components/loadingSkeleton";
import FeedbackCard from "./feedbackCard";
import { useGetCustomer } from "@/lib/hooks/api/queries";
import Pagination from "@/components/pagination";
import { useDeleteCustomerFeedback } from "@/lib/hooks/api/mutations";
import Modal from "@/components/modal/modalConfirmation";
import { showToast } from "@/lib/util";

const FeedbackPage = () => {
  const { data: customerService, isPending: isLoadingArticles } =
    useGetCustomer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackIdToDelete, setFeedbackIdToDelete] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteFeedback } = useDeleteCustomerFeedback();

  const handleDelete = (id: string) => {
    setFeedbackIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (feedbackIdToDelete) {
      setIsDeleting(true);

      deleteFeedback(feedbackIdToDelete, {
        onSuccess: () => {
          setShowDeleteModal(false);
          showToast.success("Feedback deleted successfully");
          setIsDeleting(false);
        },
        onError: () => {
          setIsDeleting(false);
        },
      });
    }
  };

  return (
    <div className="md:py-14 py-10 px-4 md:px-8 space-y-6">
      {isLoadingArticles ? (
        <LoadingSkeleton count={10} type="table" />
      ) : (
        customerService?.map((feedback) => (
          <FeedbackCard
            key={feedback._id}
            feedback={feedback}
            delete={true}
            onDelete={handleDelete}
          />
        ))
      )}
      <Pagination
        currentPage={1}
        totalPages={8}
        onPageChange={(page) => console.log("Page changed to:", page)}
      />

      <Modal
        isOpen={showDeleteModal}
        isConfirmLoading={isDeleting}
        title="Are you sure you want to delete this feedback?"
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default FeedbackPage;
