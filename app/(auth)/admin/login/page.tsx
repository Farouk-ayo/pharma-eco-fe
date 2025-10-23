"use client";

import Button from "@/components/buttons";
import React from "react";
import { showToast } from "@/lib/util";
import { useForm } from "react-hook-form";
import { LoginFormmInputs, loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostAdmin } from "@/lib/hooks/api/mutations";
import { LoginInputsPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const postCustomer = usePostAdmin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormmInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (data: LoginInputsPayload) => {
    try {
      await postCustomer.mutateAsync(data, {
        onSuccess: (response) => {
          router.push("/dashboard");
          reset();
          if (response?.data?.token) {
            Cookies.set("authToken", response.data.token, { expires: 1 });
            showToast.success("Login successful");
            router.push("/dashboard");
            reset();
          } else {
            showToast.error("Invalid login credentials");
          }
        },
      });
    } catch (error) {
      console.error("Mutation error:", error);
      showToast.error("An error occurred during login");
    }
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black">Sign In</h2>
          <p>Glad to see you again</p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-black font-semibold">
                Email Address
              </label>
              <input
                type="email"
                {...register("Email")}
                placeholder="Enter email address"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.Email && (
                <span className="text-red-600">{errors.Email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-black font-semibold">Password</label>
              <input
                type="password"
                {...register("Password")}
                placeholder="Enter Password"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.Password && (
                <span className="text-red-600">{errors.Password.message}</span>
              )}
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full text-white"
              isLoading={postCustomer.isPending}
            >
              {postCustomer.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
