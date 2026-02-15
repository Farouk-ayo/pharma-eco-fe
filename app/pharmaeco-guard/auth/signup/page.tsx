"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMRSignUpInputs, emrSignUpSchema } from "@/lib/validation";
import Button from "@/components/buttons";
import { useEMRSignUp } from "@/lib/api/mutations";
import { getErrorMessage, googleErrorMessages, showToast } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const EMRSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const signUpMutation = useEMRSignUp();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const errorMessage =
        googleErrorMessages[error] ||
        "Authentication failed. Please try again.";
      showToast.error(errorMessage);

      router.replace("/pharmaeco-guard/auth/signup");
    }
  }, [searchParams, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EMRSignUpInputs>({
    resolver: zodResolver(emrSignUpSchema),
  });

  const onSubmit = (data: EMRSignUpInputs) => {
    if (signUpMutation.isPending || isSubmitting) return;

    signUpMutation.mutate(data, {
      onSuccess: (response) => {
        const { token } = response.data.data;
        Cookies.set("emrAuthToken", token, { expires: 7 });
        showToast.success("Account created successfully");
        router.push("/pharmaeco-guard/dashboard");
      },
      onError: (error) => {
        showToast.error(
          getErrorMessage(error, "Registration failed. Please try again."),
        );
      },
    });
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/emr/auth/google`;
  };

  const isLoading = signUpMutation.isPending || isSubmitting;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
          Create Account
        </h1>
        <p className="text-base text-primaryDark">
          Join PharmaEcoGuard EMR To Streamline Your Practice
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 h-14 border border-gray-300 rounded-b-[30px] rounded-t-[8px] bg-white hover:bg-gray-50 text-gray-700 font-medium mb-5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            First Name
          </label>
          <input
            {...register("firstName")}
            placeholder="Enter first name"
            disabled={isLoading}
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {errors.firstName && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            Last Name
          </label>
          <input
            {...register("lastName")}
            placeholder="Enter last name"
            disabled={isLoading}
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {errors.lastName && (
            <span className="text-sm text-red-500 mt-1 block">
              {errors.lastName.message}
            </span>
          )}
        </div>

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

        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter confirm password"
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
          isLoading={signUpMutation.isPending || isSubmitting}
          isDisabled={isLoading}
          className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
        >
          Create Account
        </Button>

        <p className="text-center text-base text-textPrimary pt-2">
          Already Have An Account?{" "}
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

export default EMRSignUp;
