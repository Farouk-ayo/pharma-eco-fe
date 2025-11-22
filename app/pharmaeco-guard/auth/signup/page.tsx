"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMRSignUpInputs, emrSignUpSchema } from "@/lib/validation";
import Button from "@/components/buttons";
import { useEMRSignUp } from "@/lib/api/mutations";
import { showToast } from "@/lib/util";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const EMRSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const signUpMutation = useEMRSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EMRSignUpInputs>({
    resolver: zodResolver(emrSignUpSchema),
  });

  const onSubmit = (data: EMRSignUpInputs) => {
    signUpMutation.mutate(data, {
      onSuccess: (response) => {
        const { token } = response.data.data;
        Cookies.set("emrAuthToken", token, { expires: 7 });
        showToast.success("Account created successfully");
        router.push("/pharmaeco-guard/dashboard");
      },
      onError: (error: Error) => {
        showToast.error(error.message || "Registration failed");
      },
    });
  };

  return (
    <div className="w-full">
      {/* Form Title */}
      <div className="mb-6">
        <h1 className="text-2xl text-center lg:text-left mb-2 text-primaryDark font-semibold lg:text-3xl">
          Create Account
        </h1>
        <p className="text-base text-primaryDark">
          Join PharmaEcoGuard EMR To Streamline Your Practice
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div>
          <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-2">
            First Name
          </label>
          <input
            {...register("firstName")}
            placeholder="Enter first name"
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
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
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
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
            className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
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
              className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
              className="w-full border border-gray-300 px-4 py-2 h-14 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
          isDisabled={isSubmitting}
          className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
        >
          Create Account
        </Button>

        <p className="text-center text-base text-textPrimary pt-2">
          Already Have An Account?{" "}
          <Link
            href="/pharmaeco-guard/signin"
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
