import { Suspense } from "react";
import EMRSignInContent from "./EMRSignInContent";

export default function SignInPage() {
  return (
    <Suspense>
      <EMRSignInContent />
    </Suspense>
  );
}
