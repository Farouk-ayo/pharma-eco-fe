import Button from "@/components/buttons";
import Image from "next/image";

const StepThreeForm = () => {
  return (
    <div className="flex flex-col justify-center h-full items-center gap-4 py-8 ">
      <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
      <div className="relative flex items-center w-56 md:w-full h-56">
        <Image priority src="/success.svg" alt="pharmaeco" layout="fill" />
      </div>{" "}
      <p className="text-gray-600 text-center">
        We appreciate your effort for taking your time to give the information.
        Our Representative will contact you shortly to discuss the full details
        with you.
      </p>
      <Button
        type="button"
        size="lg"
        className="w-full text-white text-center !rounded-b-[30px] !rounded-t-[8px]"
        href="/"
      >
        Close
      </Button>
    </div>
  );
};

export default StepThreeForm;
