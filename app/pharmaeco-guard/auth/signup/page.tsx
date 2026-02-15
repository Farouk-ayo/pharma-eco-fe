import { Suspense } from "react";
import EMRSignUpContent from "./EMRSignUpContent";
import SuspenseLoader from "@/components/loadingSkeleton/suspenseLoader";

export default function SignUpPage() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <EMRSignUpContent />
    </Suspense>
  );
}
