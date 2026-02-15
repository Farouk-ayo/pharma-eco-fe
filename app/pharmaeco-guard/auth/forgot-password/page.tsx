"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/buttons";
import { getErrorMessage, showToast } from "@/lib/util";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/services/axiosInstance";

const forgotPasswordSchema = z.object({
  emailAddress: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInputs) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/emr/auth/forgot-password",
        data,
      );
      showToast.success(
        response.data.message ||
          "Password reset instructions sent to your email",
      );
      setSentEmail(data.emailAddress);
      setEmailSent(true);
    } catch (error) {
      showToast.error(
        getErrorMessage(
          error,
          "Failed to send reset instructions. Please try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
            Check Your Email
          </h1>
          <p className="text-base text-primaryDark">
            We&apos;ve sent password reset instructions to{" "}
            <strong>{sentEmail}</strong>
          </p>
        </div>

        <div className="space-y-5 w-full">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 mb-2">
              <strong>✓ Email sent successfully</strong>
            </p>
            <p className="text-sm text-green-700">
              We&apos;ve sent you two options:
            </p>
            <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
              <li>A direct reset link (click to reset)</li>
              <li>A 6-digit code (enter below if link doesn&apos;t work)</li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="actionBtn"
            onClick={() =>
              router.push(
                `/pharmaeco-guard/auth/reset-password?email=${sentEmail}`,
              )
            }
            className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
          >
            Enter Reset Code
          </Button>

          <p className="text-center text-base text-textPrimary pt-2">
            Didn&apos;t receive the email?{" "}
            <button
              onClick={() => setEmailSent(false)}
              className="text-secondary font-semibold hover:underline"
            >
              Try Again
            </button>
          </p>

          <p className="text-center text-base text-textPrimary">
            <Link
              href="/pharmaeco-guard/auth/signin"
              className="text-secondary font-semibold hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
          Forgot Password
        </h1>
        <p className="text-base text-primaryDark">
          Enter your email address and we&apos;ll send you instructions to reset
          your password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            Email Address
          </label>
          <input
            {...register("emailAddress")}
            type="email"
            placeholder="Enter email address"
            disabled={isLoading}
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {errors.emailAddress && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.emailAddress.message}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          type="submit"
          size="actionBtn"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
        >
          Send Reset Instructions
        </Button>

        <p className="text-center text-base text-textPrimary pt-2">
          Remember your password?{" "}
          <Link
            href="/pharmaeco-guard/auth/signin"
            className="text-secondary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
