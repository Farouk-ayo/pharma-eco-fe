import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepOneInputs, stepOneSchema } from "@/lib/validation";
import Button from "@/components/buttons";

interface StepOneProps {
  onNext: (data: StepOneInputs) => void;
  defaultValues?: Partial<StepOneInputs>;
}

const StepOneForm = ({ onNext, defaultValues }: StepOneProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepOneInputs>({
    resolver: zodResolver(stepOneSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 w-full">
      <div>
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          First Name
        </label>
        <input
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

      <div>
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          Last Name
        </label>
        <input
          {...register("lastName")}
          placeholder="Enter last name"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.lastName && (
          <span className="text-sm text-red-500">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          Email Address
        </label>
        <input
          {...register("emailAddress")}
          type="email"
          placeholder="Enter email address"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.emailAddress && (
          <span className="text-sm text-red-500">
            {errors.emailAddress.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-base lg:text-lg text-gray-600 font-semibold mb-1">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          type="tel"
          placeholder="Enter phone number"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.phoneNumber && (
          <span className="text-sm text-red-500">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
      <Button
        variant="primary"
        type="submit"
        isDisabled={isSubmitting}
        className=" w-full text-white"
      >
        Continue
      </Button>
    </form>
  );
};

export default StepOneForm;
