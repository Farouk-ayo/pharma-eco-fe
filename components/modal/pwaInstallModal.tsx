/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed") === "true";

    // If user already dismissed => never show again
    if (dismissed) return;

    // Detect if already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show small floating button instead of popup
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    localStorage.setItem("pwa-install-dismissed", "true");
    setShowModal(false);
    setShowInstallButton(false);
  };

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "dismissed") {
      localStorage.setItem("pwa-install-dismissed", "true");
    }

    setDeferredPrompt(null);
    setShowModal(false);
    setShowInstallButton(false);
  };

  return (
    <>
      {/* Floating “Install App” button */}
      {showInstallButton && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 z-[9999] bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fadeIn"
        >
          <Download className="w-4 h-4" />
          Install App
        </button>
      )}

      {/* Install Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl max-w-sm w-full shadow-xl animate-slideUp">
            <div className="relative p-5 sm:p-6">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <h3 className="text-lg font-semibold mb-2">Install App</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add this app to your home screen for faster access and a better
                fullscreen experience.
              </p>

              <button
                onClick={installApp}
                className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Install Now
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }

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
      )}
    </>
  );
};

export default PWAInstall;
