"use client";

import Image from "next/image";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  isConfirmLoading?: boolean;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  isConfirmLoading,
  confirmText = "Delete",
  cancelText = "Cancel",
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-md text-center max-w-sm w-full mx-auto ">
        <Image
          alt="delete"
          src={"/delete-icon.svg"}
          className=" justify-self-center"
          width={100}
          height={100}
        />
        <h2 className="text-xl font-semibold my-4">{title}</h2>
        {message && <p className="text-gray-600 mb-4">{message}</p>}
        <div className="flex justify-center  gap-3 w-full">
          <button
            onClick={onClose}
            className="text-black border   w-full rounded-md"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600   text-white py-2 px-4 w-full rounded-md"
          >
            {isConfirmLoading ? <span className="loader"></span> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
