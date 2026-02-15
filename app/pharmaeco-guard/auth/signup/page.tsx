import { Suspense } from "react";
import EMRSignUpContent from "./EMRSignUpContent";

export default function SignUpPage() {
  return (
    <Suspense>
      <EMRSignUpContent />
    </Suspense>
  );
}
