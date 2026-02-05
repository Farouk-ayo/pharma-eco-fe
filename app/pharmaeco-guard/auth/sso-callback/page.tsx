"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { showToast } from "@/lib/util";
import { getErrorMessage } from "@/lib/util";
import axiosInstance from "@/services/axiosInstance";
import Cookies from "js-cookie";

export default function SSOCallback() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isLoaded) return;

    const handleSSOCallback = async () => {
      if (!user) {
        showToast.error("Authentication failed. Please try again.");
        router.replace("/pharmaeco-guard/auth/signup");
        return;
      }

      try {
        const emailAddress = user.primaryEmailAddress?.emailAddress;
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";

        const googleAccount = user.externalAccounts.find(
          (account) => account.provider === "google",
        );

        if (!emailAddress || !googleAccount) {
          throw new Error("Google account data missing");
        }

        const response = await axiosInstance.post("/emr/auth/google", {
          firstName,
          lastName,
          emailAddress,
          googleId: googleAccount.providerUserId,
        });

        Cookies.set("emrAuthToken", response.data.data.token, { expires: 7 });
        showToast.success(response.data.message || "Login successful");
        router.replace("/pharmaeco-guard/dashboard");
      } catch (error) {
        await signOut();
        Cookies.remove("emrAuthToken");

        showToast.error(
          getErrorMessage(error, "Google sign-in failed. Please try again."),
        );
        router.replace("/pharmaeco-guard/auth/signup");
      }
    };

    handleSSOCallback();
  }, [isLoaded, router, user, signOut]);

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
