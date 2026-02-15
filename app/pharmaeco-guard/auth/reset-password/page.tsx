import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";
import SuspenseLoader from "@/components/loadingSkeleton/suspenseLoader";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
