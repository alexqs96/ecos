import { SignInForm } from "@/components/Forms/AuthForms";
import { Toaster } from "react-hot-toast";

/*
  callbackUrl es para guardar la url a la que el cliente solicita entrar pero primero debe iniciar sesion.
*/

export default function SignIn(searchParams) {
  return (
    <>
      <Toaster />
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </>
  )
}
