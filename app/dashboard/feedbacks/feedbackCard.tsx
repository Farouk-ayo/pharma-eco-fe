import React from "react";
import { CustomerService } from "@/lib/types";
import Badge from "@/components/badge";
import Button from "@/components/buttons";

interface FeedbackCardProps {
  feedback: CustomerService;
  delete?: boolean;
  onDelete?: (_id: string) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  delete: allowDelete,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg relative p-6  mb-4 shadow-sm bg-white">
      <Badge text={feedback.organizationName} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 mt-4">
        <div>
          <p className="font-bold text-sm text-gray-700">First Name</p>
          <p className="text-gray-800">{feedback.firstName}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">Last Name</p>
          <p className="text-gray-800">{feedback.lastName}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Pharmacy/Company/Organisation Name
          </p>
          <p className="text-gray-800">{feedback.organizationName}</p>
        </div>

        <div>
          <p className="font-bold text-sm text-gray-700">
            Pharmacy/Company/Organisation Address/City
          </p>
          <p className="text-gray-800">{feedback.emailAddress}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">Email Address</p>
          <p className="text-gray-800">{feedback.emailAddress}</p>
        </div>

        <div>
          <p className="font-bold text-sm text-gray-700">Phone Number</p>
          <p className="text-gray-800">{feedback.phoneNumber}</p>
        </div>
        <div className="md:col-span-2">
          <p className="font-bold text-sm text-gray-700">Message</p>
          <p className="text-gray-800">{feedback.Message}</p>
        </div>
      </div>
      {allowDelete && (
        <div className="flex justify-center items-center gap-4 mt-4">
          {allowDelete && (
            <Button
              className="bg-red-600 text-white !px-6 !py-2 rounded-lg hover:bg-red-700 text-sm"
              onClick={() => feedback._id && onDelete?.(feedback._id)}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
