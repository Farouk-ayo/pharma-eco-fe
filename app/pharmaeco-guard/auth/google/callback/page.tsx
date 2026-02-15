import { Suspense } from "react";
import GoogleCallbackContent from "./GoogleCallbackContent";

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="relative h-96 flex items-center justify-center">
          <div className="text-center h-full flex justify-center items-center flex-col gap-5">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
