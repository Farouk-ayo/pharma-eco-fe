import { Suspense } from "react";
import EMRSignUpContent from "./EMRSignUpContent";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <EMRSignUpContent />
    </Suspense>
  );
}
