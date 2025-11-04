import React from "react";
import { RegisteredUser } from "@/lib/types";
import Button from "@/components/buttons";
import AdminBadge from "@/components/badge/adminBadge";

interface UserCardProps {
  user: RegisteredUser;
  edit?: boolean;
  delete?: boolean;
  onEdit?: (user: RegisteredUser) => void;
  onDelete?: (_id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  edit,
  delete: allowDelete,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg relative p-6  mb-4 shadow-sm bg-white">
      <AdminBadge text={user.organizationName} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 mt-4">
        <div>
          <p className="font-bold text-sm text-gray-700">First Name</p>
          <p className="text-gray-800">{user.firstName}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">Last Name</p>
          <p className="text-gray-800">{user.lastName}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation Name
          </p>
          <p className="text-gray-800">{user.organizationName}</p>
        </div>

        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation email Address
          </p>
          <p className="text-gray-800">{user.emailAddress}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">Email Address</p>
          <p className="text-gray-800">{user.emailAddress}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation State
          </p>
          <p className="text-gray-800">{user.state}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation City
          </p>
          <p className="text-gray-800">{user.city}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">Phone Number</p>
          <p className="text-gray-800">{user.phoneNumber}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation Local Govt
          </p>
          <p className="text-gray-800">{user.localGovt}</p>
        </div>
        <div>
          <p className="font-bold text-sm text-gray-700">
            Company/Organisation Zip Code
          </p>
          <p className="text-gray-800">{user.zipCode}</p>
        </div>
        <div className="md:col-span-2">
          <p className="font-bold text-sm text-gray-700">Others</p>
          <p className="text-gray-800">{user.others}</p>
        </div>
      </div>
      {(edit || allowDelete) && (
        <div className="flex justify-center items-center gap-4 mt-4">
          {edit && (
            <Button
              className="!bg-black text-white !px-6 !py-2 !rounded-lg text-sm"
              onClick={() => user && onEdit?.(user)}
            >
              Edit
            </Button>
          )}
          {allowDelete && (
            <Button
              className="bg-red-600 text-white !px-6 !py-2 !rounded-lg hover:bg-red-700 text-sm"
              onClick={() => user._id && onDelete?.(user._id)}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
