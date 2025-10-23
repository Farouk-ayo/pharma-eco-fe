"use client";

import React, { useEffect, useState } from "react";
import { usePatchRegisterUser } from "@/lib/hooks/api/mutations";
import { useParams, useRouter } from "next/navigation";
import { nigeriaStates } from "@/lib/data/nigeria-states-lga";
import { customStyles } from "@/app/register/components/stepTwo";
import { useGetRegisterUser } from "@/lib/hooks/api/queries";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { FormInputs, formSchema } from "@/lib/validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import Button from "@/components/buttons";

const EditUser: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: user, isPending: isFetchingDetails } = useGetRegisterUser(
    id as string
  );

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const [availableLGAs, setAvailableLGAs] = useState<
    { value: string; label: string }[]
  >([]);

  const stateOptions = nigeriaStates.map((state) => ({
    value: state.state.name,
    label: state.state.name,
  }));

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        organizationName: user.organizationName,
        City: user.City,
        State: user.State,
        localGovt: user.localGovt,
        zipCode: user.zipCode || 0,
        Others: user.Others,
      });

      // Update LGAs based on user's state
      if (user.State) {
        const selectedState = nigeriaStates.find(
          (state) => state.state.name === user.State
        );
        if (selectedState) {
          setAvailableLGAs(
            selectedState.state.locals.map((lga) => ({
              value: lga.name,
              label: lga.name,
            }))
          );
        }
      }
    }
  }, [user, reset]);

  const selectedState = watch("State");
  useEffect(() => {
    if (selectedState) {
      const stateData = nigeriaStates.find(
        (state) => state.state.name === selectedState
      );
      if (stateData) {
        setAvailableLGAs(
          stateData.state.locals.map((lga) => ({
            value: lga.name,
            label: lga.name,
          }))
        );
      } else {
        setAvailableLGAs([]);
      }
    }
  }, [selectedState]);

  const { mutate: updateUser, isPending } = usePatchRegisterUser();

  const onSubmit = handleFormSubmit((data: FormInputs) => {
    updateUser(
      {
        _id: Array.isArray(id) ? id[0] : id || "",
        data: { ...data, zipCode: data.zipCode ?? 0 },
      },
      {
        onSuccess: () => {
          router.push("/dashboard/users");
        },
      }
    );
  });

  if (isFetchingDetails) {
    return <LoadingSkeleton count={5} type="table" />;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Edit User</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={onSubmit}
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            placeholder="Enter first name"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.firstName && (
            <span className="text-sm text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            {...register("lastName")}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.lastName && (
            <span className="text-sm text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>
        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            {...register("emailAddress")}
            type="email"
            placeholder="Enter email address"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.emailAddress && (
            <span className="text-sm text-red-500">
              {errors.emailAddress.message}
            </span>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            placeholder="Enter phone number"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.phoneNumber && (
            <span className="text-sm text-red-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        {/* Organization Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Pharmacy/Company/Organisation Name
          </label>
          <input
            type="text"
            placeholder="Enter business name"
            {...register("organizationName")}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.organizationName && (
            <span className="text-sm text-red-500">
              {errors.organizationName.message}
            </span>
          )}
        </div>
        {/* Organization Address/City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Pharmacy/Company/Organisation Address/City
          </label>
          <input
            type="text"
            {...register("City")}
            placeholder="Enter business address/city"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.City && (
            <span className="text-sm text-red-500">{errors.City.message}</span>
          )}
        </div>
        {/* Organization State */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            State
          </label>

          <Controller
            name="State"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={stateOptions}
                placeholder="Select State"
                styles={customStyles}
                value={
                  stateOptions.find(
                    (option) => option.value === watch("State")
                  ) || null
                }
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.State && (
            <span className="text-sm text-red-500">{errors.State.message}</span>
          )}
        </div>
        {/* Organization Local Govt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Local Govt
          </label>

          <Controller
            name="localGovt"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={availableLGAs}
                isDisabled={!selectedState}
                placeholder="Select LGA"
                styles={customStyles}
                value={
                  availableLGAs.find(
                    (option) => option.value === watch("localGovt")
                  ) || null
                }
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.localGovt && (
            <span className="text-sm text-red-500">
              {errors.localGovt.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Pharmacy/Company/Organisation Zip Code
          </label>
          <input
            {...register("zipCode")}
            type="text"
            pattern="\d*"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            placeholder="Enter business zip code"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />{" "}
          {errors.zipCode && (
            <span className="text-sm text-red-500">
              {errors.zipCode.message}
            </span>
          )}
        </div>
        <div className="">
          <label className="block text-sm font-semibold text-gray-700">
            Others (What do you want to dispose? Any special time?)
          </label>
          <textarea
            {...register("Others")}
            placeholder="Enter other details"
            rows={3}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4 col-span-2">
          <Button
            onClick={() => router.push("/dashboard/users")}
            className="!bg-gray-50 !text-black !px-6 !py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isPending}
            className="!bg-black !text-white !px-6 !py-2 rounded-md"
          >
            Save
          </Button>
        </div>
      </form>

      {/* Buttons */}
    </div>
  );
};

export default EditUser;
