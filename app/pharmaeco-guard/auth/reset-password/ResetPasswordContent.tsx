"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/buttons";
import { getErrorMessage, showToast } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/services/axiosInstance";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      showToast.error("Invalid reset link");
      router.push("/pharmaeco-guard/auth/signin");
    } else {
      setToken(resetToken);
    }
  }, [searchParams, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    if (!token) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/emr/auth/reset-password", {
        token,
        password: data.password,
      });
      showToast.success(response.data.message || "Password reset successful");
      router.push("/pharmaeco-guard/auth/signin");
    } catch (error) {
      showToast.error(
        getErrorMessage(error, "Failed to reset password. Please try again."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
          Reset Password
        </h1>
        <p className="text-base text-primaryDark">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              disabled={isLoading}
              className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              disabled={isLoading}
              className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 disabled:opacity-50"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.confirmPassword.message}
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
          Reset Password
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
}
