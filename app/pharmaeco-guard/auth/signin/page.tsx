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
import Cookies from "js-cookie";
import Link from "next/link";

const EMRSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signInMutation = useEMRSignIn();

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

  const isLoading = signInMutation.isPending || isSubmitting;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2  text-primaryDark font-semibold lg:text-3xl">
          Sign In
        </h1>
        <p className="text-base text-primaryDark">Glad to meet you again!</p>
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
          isLoading={isLoading}
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
