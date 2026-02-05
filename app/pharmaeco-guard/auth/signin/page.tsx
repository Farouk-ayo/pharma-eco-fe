"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMRSignInInputs, emrSignInSchema } from "@/lib/validation";
import Button from "@/components/buttons";
import { useEMRSignIn } from "@/lib/api/mutations";
import { getErrorMessage, showToast } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Cookies from "js-cookie";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const EMRSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const signInMutation = useEMRSignIn();
  const { signIn, isLoaded } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EMRSignInInputs>({
    resolver: zodResolver(emrSignInSchema),
  });

  const onSubmit = (data: EMRSignInInputs) => {
    if (signInMutation.isPending || isSubmitting) return;

    signInMutation.mutate(data, {
      onSuccess: (response) => {
        const { token, user } = response.data.data;
        console.log(user);
        Cookies.set("emrAuthToken", token, { expires: 7 });
        showToast.success("Login successful");
        router.push("/pharmaeco-guard/dashboard");
      },
      onError: (error) => {
        showToast.error(
          getErrorMessage(
            error,
            "Login failed. Please check your credentials and try again.",
          ),
        );
      },
    });
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    setIsGoogleLoading(true);

    try {
      const ss = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/pharmaeco-guard/auth/sso-callback",
        redirectUrlComplete: "/pharmaeco-guard/auth/sso-callback",
      });
      console.log(ss, "ss");
    } catch (err) {
      const error = err as {
        errors?: Array<{ code?: string; message?: string }>;
      };
      console.error("Google sign-in error:", error);

      if (error.errors?.[0]?.message) {
        showToast.error(error.errors[0].message);
      } else {
        showToast.error("Google sign-in failed. Please try again.");
      }

      setIsGoogleLoading(false);
    }
  };

  const isLoading = signInMutation.isPending || isSubmitting || isGoogleLoading;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2  text-primaryDark font-semibold lg:text-3xl">
          Sign In
        </h1>
        <p className="text-base text-primaryDark">Glad to meet you again!</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 h-14 border border-gray-300 rounded-b-[30px] rounded-t-[8px] bg-white hover:bg-gray-50 text-gray-700 font-medium mb-5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FcGoogle className="h-5 w-5" />
        {isGoogleLoading ? "Connecting..." : "Continue with Google"}
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

        <div className="text-right">
          <Link
            href="/pharmaeco-guard/forgot-password"
            className="text-sm text-secondary hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          variant="primary"
          type="submit"
          size="actionBtn"
          isLoading={signInMutation.isPending || isSubmitting}
          isDisabled={isLoading}
          className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
        >
          Sign In
        </Button>

        <p className="text-center text-base text-textPrimary pt-2">
          Don&apos;t Have An Account?{" "}
          <Link
            href="/pharmaeco-guard/auth/signup"
            className="text-secondary font-semibold hover:underline"
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EMRSignIn;
