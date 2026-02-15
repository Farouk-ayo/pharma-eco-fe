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

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
type OTPInputs = z.infer<typeof otpSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [useOTP, setUseOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const resetToken = searchParams.get("token");
    const emailParam = searchParams.get("email");

    setEmail(emailParam);

    if (resetToken) {
      setToken(resetToken);
      setUseOTP(false);
    } else if (emailParam) {
      setUseOTP(true);
    } else {
      showToast.error("Invalid reset link");
      router.push("/pharmaeco-guard/auth/signin");
    }
  }, [searchParams, router]);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors },
    watch,
  } = useForm<OTPInputs>({
    resolver: zodResolver(otpSchema),
  });

  const otpValue = watch("otp");

  const onOTPSubmit = async (data: OTPInputs) => {
    if (!email) return;

    setIsLoading(true);

    try {
      await axiosInstance.post("/emr/auth/verify-otp", {
        emailAddress: email,
        otp: data.otp,
      });
      showToast.success("OTP verified! Now set your new password.");
      setOtpVerified(true);
    } catch (error) {
      showToast.error(
        getErrorMessage(error, "Invalid or expired OTP. Please try again."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: ResetPasswordInputs) => {
    setIsLoading(true);

    try {
      if (useOTP && email) {
        await axiosInstance.post("/emr/auth/reset-password-otp", {
          emailAddress: email,
          otp: otpValue,
          password: data.password,
        });
      } else if (token) {
        await axiosInstance.post("/emr/auth/reset-password", {
          token,
          password: data.password,
        });
      }

      showToast.success("Password reset successful");
      router.push("/pharmaeco-guard/auth/signin");
    } catch (error) {
      showToast.error(
        getErrorMessage(error, "Failed to reset password. Please try again."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !email) {
    return null;
  }

  if (useOTP && !otpVerified) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
            Enter Reset Code
          </h1>
          <p className="text-base text-primaryDark">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>
        </div>

        <form
          onSubmit={handleOTPSubmit(onOTPSubmit)}
          className="space-y-5 w-full"
        >
          <div>
            <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
              Reset Code
            </label>
            <input
              {...registerOTP("otp")}
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              disabled={isLoading}
              className="w-full border border-gray-300 px-4 py-2 h-14 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {otpErrors.otp && (
              <span className="text-sm text-red-500 mt-1 block">
                {otpErrors.otp.message}
              </span>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Code expires in 10 minutes
            </p>
          </div>

          <Button
            variant="primary"
            type="submit"
            size="actionBtn"
            isLoading={isLoading}
            isDisabled={isLoading}
            className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
          >
            Verify Code
          </Button>

          <p className="text-center text-base text-textPrimary pt-2">
            Didn&apos;t receive the code?{" "}
            <Link
              href="/pharmaeco-guard/auth/forgot-password"
              className="text-secondary font-semibold hover:underline"
            >
              Request New Code
            </Link>
          </p>
        </form>
      </div>
    );
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

      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className="space-y-5 w-full"
      >
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              {...registerPassword("password")}
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
          {passwordErrors.password && (
            <span className="text-sm text-red-500 mt-1 block">
              {passwordErrors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              {...registerPassword("confirmPassword")}
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
          {passwordErrors.confirmPassword && (
            <span className="text-sm text-red-500 mt-1 block">
              {passwordErrors.confirmPassword.message}
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
};

export default ResetPassword;
