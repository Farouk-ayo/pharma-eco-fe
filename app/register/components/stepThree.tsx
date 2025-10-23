import Button from "@/components/buttons";
import Image from "next/image";

const StepThreeForm = () => {
  return (
    <div className="flex flex-col justify-center h-full items-center gap-4 py-8 ">
      <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
      <div className="relative flex items-center w-56 md:w-full h-56">
        <Image priority src="/success.svg" alt="pharmabin" layout="fill" />
      </div>{" "}
      <p className="text-gray-600 text-center">
        We appreciate your effort in taking time to give the information. Our
        Representatives will contact you shortly to discuss the full details
        with you.
      </p>
      <Button type="button" className="w-full text-white text-center" href="/">
        Close
      </Button>
    </div>
  );
};

export default StepThreeForm;
