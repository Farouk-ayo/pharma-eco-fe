import React from "react";
import { Dialog } from "@headlessui/react";
import { NotificationModalProps } from "@/lib/types";
import Image from "next/image";

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  closeModal,
  notifications,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed top-16 right-5 z-50 w-80 p-4 bg-white rounded-lg shadow-lg"
    >
      <Dialog.Panel>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button onClick={closeModal}>✕</button>
        </div>
        <div className="space-y-4 py-6">
          {notifications.length > 4 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col"
              >
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {notification.time} | {notification.date}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="./notification.svg" alt="" />
              <p className="text-primary text-lg">No notifications</p>
              <div className="text-center text-gray-500 text-base">
                You have no notifications yet. Please come back later.
              </div>
            </div>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default NotificationModal;
