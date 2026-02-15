import { Suspense } from "react";
import EMRSignInContent from "./EMRSignInContent";
import SuspenseLoader from "@/components/loadingSkeleton/suspenseLoader";

export default function SignInPage() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <EMRSignInContent />
    </Suspense>
  );
}
