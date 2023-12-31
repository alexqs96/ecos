import { SignUpForm } from "@/components/Forms/AuthForms";
import { LeftPanel } from "@/components/ui/LeftPanel";
import { Toaster } from "react-hot-toast";

export default function SignUp() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 h-[100dvh]">
        <Toaster />
        <LeftPanel/>
        <SignUpForm />
      </section>
    </>
  );
}
