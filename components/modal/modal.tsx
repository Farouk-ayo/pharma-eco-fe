import Image from "next/image";
import React, { useEffect } from "react";
import { CrossIcon } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailedContent?: {
    title: string;
    media: { type: string; src: string; alt: string }[];
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, detailedContent }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getGridClass = () => {
    const count = detailedContent?.media?.length || 0;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999] transition-opacity duration-300 ease-in-out p-4 top-[10%]">
      <div className="bg-white rounded-lg max-w-4xl w-[90%] h-45%] md:h-[80%] max-h-[90vh] p-4 md:p-6 relative transform transition-all duration-500 ease-in-out flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition duration-300"
        >
          <CrossIcon width={40} height={40} />
        </button>

        <h3 className=" text-base md:text-xl  font-semibold text-primary mb-4 pr-8">
          {detailedContent?.title}
        </h3>

        <div className="overflow-y-auto overflow-x-hidden flex-1 pr-2 custom-scrollbar">
          <div className={`grid ${getGridClass()} gap-4 pb-4`}>
            {detailedContent?.media?.length === 1 ? (
              <div className="w-full mx-auto" style={{ maxHeight: "70vh" }}>
                {detailedContent.media[0].type === "image" ? (
                  <div className="relative w-full h-full min-h-[30vh] md:min-h-[50vh]">
                    <Image
                      src={detailedContent.media[0].src}
                      alt={detailedContent.media[0].alt || "Media content"}
                      fill
                      // sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-contain rounded-lg"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-full"
                    style={{ minHeight: "50vh" }}
                  >
                    <video
                      controls
                      className="w-full h-full object-contain rounded-lg"
                      style={{ maxHeight: "70vh" }}
                    >
                      <source
                        src={detailedContent.media[0].src}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ) : (
              detailedContent?.media.map((item, index) => (
                <div key={index} className="w-full h-64 relative">
                  {item.type === "image" ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={item.alt || "Media content"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <video
                        controls
                        className="w-full h-full object-cover rounded-lg"
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
