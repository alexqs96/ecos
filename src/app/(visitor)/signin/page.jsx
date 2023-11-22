import { SignInForm } from "@/components/Forms/AuthForms";
import { LeftPanel } from "@/components/ui/LeftPanel";
import { Toaster } from "react-hot-toast";

/*
  callbackUrl es para guardar la url a la que el cliente solicita entrar pero primero debe iniciar sesion.
*/

export default function SignIn(searchParams) {
  return (
    <>
      <section className="flex h-[100dvh]">
      <Toaster />
      <LeftPanel/>
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      </section>
    </>
  )
}
