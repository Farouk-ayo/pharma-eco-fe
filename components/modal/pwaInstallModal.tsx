"use client";

import React, { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import Button from "../buttons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const hasSeenPrompt = localStorage.getItem("pwa-install-prompt-seen");

    if (isStandalone || hasSeenPrompt) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowModal(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    localStorage.setItem("pwa-install-prompt-seen", "true");
    setShowModal(false);
  };

  const handleClose = () => {
    localStorage.setItem("pwa-install-prompt-seen", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl max-w-sm w-full shadow-xl animate-slideUp">
        <div className="relative p-5 sm:p-6">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Title & Text */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Install PharmaEco App
            </h3>
            <p className="text-sm text-gray-600">
              Faster access, smoother experience, and offline support.
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleInstallClick}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Install Now
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PWAInstallModal;
