"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import PWAInstallModal from "@/components/modal/pwaInstallModal";
import { ClerkProvider } from "@clerk/nextjs";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const RootClientLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-sm",
            footerActionLink: "text-green-600 hover:text-green-700",
          },
        }}
      >
        <Toaster />
        <PWAInstallModal />
        {children}
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default RootClientLayout;
