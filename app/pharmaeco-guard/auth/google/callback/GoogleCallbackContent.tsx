"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { googleErrorMessages, showToast } from "@/lib/util";
import Cookies from "js-cookie";

export default function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      const errorMessage =
        googleErrorMessages[error] ||
        "Authentication failed. Please try again.";
      showToast.error(errorMessage);
      router.replace("/pharmaeco-guard/auth/signin");
      return;
    }

    if (!token) {
      showToast.error("Authentication failed. No token received.");
      router.replace("/pharmaeco-guard/auth/signin");
      return;
    }

    Cookies.set("emrAuthToken", token, { expires: 7 });
    showToast.success("Welcome to PharmaEcoGuard!");
    router.replace("/pharmaeco-guard/dashboard");
  }, [searchParams, router]);

  return (
    <div className="relative h-96 flex items-center justify-center">
      <div className="text-center h-full flex justify-center items-center flex-col gap-5">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">
          Completing Google sign-in...
        </p>
        <p className="text-sm text-gray-500 mt-2">Please wait...</p>
      </div>
    </div>
  );
}
