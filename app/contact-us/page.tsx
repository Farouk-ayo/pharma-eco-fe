"use client";

import Button from "@/components/buttons";
import Header from "@/components/header/header";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { showToast } from "@/lib/util";
import { useForm } from "react-hook-form";
import { customerServiceSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostCustomer } from "@/lib/hooks/api/mutations";
import { CustomerService } from "@/lib/types";
import { HorizontalLine } from "@/components/icons";

const ContactUs = () => {
  const postCustomer = usePostCustomer();
  const initialFormData: CustomerService = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    organizationName: "",
    Message: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerService>({
    resolver: zodResolver(customerServiceSchema),
    defaultValues: initialFormData,
  });

  const onSubmit = async (data: CustomerService) => {
    postCustomer.mutate(data, {
      onSuccess: () => {
        showToast.success("Message sent successfully");
        reset(initialFormData);
      },
      onError: (error: Error) => {
        showToast.error(error.message);
      },
    });
  };

  return (
    <section>
      <Header
        title="Contact Us"
        bg="/bg-contact-us.jpg"
        description={
          <p className="text-lg text-medium text-white">
            Hope you know we are really fun to talk to? If you’re not a big
            talker and prefer e-mail, please send us a note here! We would love
            to hear from you.
          </p>
        }
      />
      <section className="px-4 py-12 lg:px-28 md:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className=" relative grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form Section */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Do You Have Something Special To Tell Us?
              </h2>
              <p>
                Do you have something special to tell us? Please fill in the
                form with your request and any other information
              </p>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-black font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    placeholder="Enter first name"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                  />
                  {errors.firstName && (
                    <span className="text-red-600">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-black font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Enter last name"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                  />
                  {errors.lastName && (
                    <span className="text-red-600">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-black font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("emailAddress")}
                    placeholder="Enter email address"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                  />
                  {errors.emailAddress && (
                    <span className="text-red-600">
                      {errors.emailAddress.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-black font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="Enter phone number"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-600">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-black font-semibold">
                    Company/Organization Name
                  </label>
                  <input
                    type="text"
                    {...register("organizationName")}
                    placeholder="Enter business name"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                  />
                  {errors.organizationName && (
                    <span className="text-red-600">
                      {errors.organizationName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-black font-semibold">
                    Others (Any special time?)
                  </label>
                  <textarea
                    {...register("Message")}
                    placeholder="Enter what you need help for"
                    className="w-full border-[0.5px] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary rounded-b-[30px] rounded-t-[8px] "
                    rows={4}
                  ></textarea>
                  {errors.Message && (
                    <span className="text-red-600">
                      {errors.Message.message}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="checkbox"
                    id="news-updates"
                    className="text-primary focus:ring-primary rounded accent-primary"
                  />
                  <label
                    htmlFor="news-updates"
                    className="text-black font-medium text-base"
                  >
                    Please keep me informed concerning <strong>News</strong> and{" "}
                    <strong>Updates</strong> from PharmaEco
                  </label>
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full text-white !rounded-b-[30px] !rounded-t-[8px]"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
            {/* vertical line  */}
            <div className="hidden lg:block absolute left-1/2 top-28 bottom-0 -translate-x-1/2 scale-75">
              <HorizontalLine className="rotate-90 h-[80%]" />
            </div>
            {/* Customer Service Section */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                We Really Want To Hear From You
              </h2>
              <p>
                Feel free to contact us with any of your questions, press
                requests, or comments. Please use the phone number or email
                address below
              </p>
              <div className="space-y-4">
                <div className="flex flex-col space-x-3">
                  <span className="text-lg flex items-center gap-2 font-semibold">
                    <Phone className="w-5 h-5 !text-white fill-black flex-shrink-0" />
                    Phone No
                  </span>
                  <span className="text-gray-800">
                    <a
                      href="tel:+2349039539042"
                      className="text-gray-600 hover:text-primary transition"
                    >
                      +234-903-953-9042
                    </a>{" "}
                  </span>
                </div>
                <div className="flex flex-col space-x-3">
                  <span className="flex items-center text-lg gap-2 font-semibold">
                    <Mail className="w-5 h-5 !text-white fill-black flex-shrink-0" />
                    Email Address
                  </span>
                  <a
                    href="mailto:pharmaeco1@gmail.com"
                    className="text-gray-600 hover:text-primary transition"
                  >
                    pharmaeco1@gmail.com
                  </a>{" "}
                </div>
                <div className="flex flex-col space-x-3">
                  <span className="flex items-center text-lg gap-2 font-semibold">
                    <MapPin className="w-5 h-5 !text-white fill-black flex-shrink-0" />
                    Location
                  </span>
                  <span className="text-gray-800">Lagos State</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactUs;
