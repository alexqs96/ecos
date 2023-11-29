"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { EcosLogo } from "../Icons";
import { SignInSchema, SignUpSchema } from "@/lib/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { INVALID_CREDENTIALS, WELCOME } from "@/lib/consts";

export function SignInForm({ callbackUrl }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res.status === 200) {
      toast.success(WELCOME+" 🥳");
      setTimeout(() => {
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push("/home");
        }
      }, 500);
    } else {
      toast.error(INVALID_CREDENTIALS);
    }
  };

  function InvitedMode() {
    setValue("username", "invitado");
    setValue("password", "invitado");
    document.querySelector('form button[type="submit"]').click();
  }

  return (
    <>
      <section className="flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-xs w-[100%] h-fit p-8 rounded-2xl dark:bg-white/10 mt-5 shadow-xl mx-auto"
        >
          <div className="flex flex-col items-center gap-1 font-semibold text-sm mb-4">
            {/* <EcosLogo size={64} />
          {/* <i>{'"Ecos conectando raices"'}</i> */}
            <h2 className="text-lg text-[#0C3712]">
              Iniciar sesión en{" "}
              <strong className="font-size text-[#2DD246]">ECOS</strong>
            </h2>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Usuario</label>
            <input
              {...register("username")}
              type="text"
              className="border rounded-md py-1 px-2 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0] "
            />
            {errors.username ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.username.message}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Contraseña</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
              />
              <button
                className="absolute right-2 inset-y-0"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye className="fill-[#D642C0]" size={20} />
                ) : (
                  <AiFillEyeInvisible className="fill-[#C4C4C4]" size={20} />
                )}
              </button>
            </div>
            {errors.password ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.password.message}
              </span>
            ) : null}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-[#D642C0] text-white dark:bg-white dark:text-black lg:py-3 py-1.5 px-3.5 mt-2 rounded-full"
          >
            {isSubmitting ? "Ingresando.." : "Ingresar"}
          </button>

          <Link
            href="/signup"
            className="block py-4 text-sm font-medium -tracking-wide mt-4 opacity-90 w-fit "
          >
            ¿No tienes cuenta?{" "}
            <strong className="underline text-[#D642C0]">
              Regístrate aqui.
            </strong>
          </Link>
        </form>

        {/* <button
        type="button"
        className="border p-2 rounded-md block h-fit mt-auto"
        onClick={() => InvitedMode()}
      >
        Ingresar como Invitado
      </button> */}
      </section>
    </>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [nextPage, setNextPage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    console.log("Enviando");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        toast.success(WELCOME + " 🥳");

        setTimeout(() => {
          router.push("/signin");
        }, 500);
      } else {
        toast.error(res.statusText);
      }
    } catch (error) {
      toast.error("Hubo un error en el servidor.");
    }
  };

  return (
    <>
      <section className="flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-xs w-[100%] h-fit p-8 rounded-2xl dark:bg-white/10 mt-5 shadow-xl mx-auto"
        >
          <div className="flex flex-col items-center gap-1 font-semibold text-sm mb-4">
            {/* <EcosLogo size={64} />
          {/* <i>{'"Ecos conectando raices"'}</i> */}
            <h2 className="text-lg text-[#0C3712]">
              Iniciar sesión en{" "}
              <strong className="font-size text-[#2DD246]">ECOS</strong>
            </h2>
          </div>
          <div
            className={"flex-col w-full" + (!nextPage ? " flex" : " hidden")}
          >
            <label className="font-medium">Nombre</label>
            <input
              {...register("name")}
              type="text"
              className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
            />
            {errors.name ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.name.message}
              </span>
            ) : null}
          </div>

          <div
            className={"flex-col w-full" + (!nextPage ? " flex" : " hidden")}
          >
            <label className="font-medium">Apellido</label>
            <input
              {...register("surname")}
              type="text"
              className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
            />
            {errors.surname ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.surname.message}
              </span>
            ) : null}
          </div>

          <div className={"flex-col w-full" + (nextPage ? " flex" : " hidden")}>
            <label className="font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
            />
            {errors.email ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.email.message}
              </span>
            ) : null}
          </div>

          <div className={"flex-col w-full" + (nextPage ? " flex" : " hidden")}>
            <label className="font-medium">Usuario</label>
            <input
              {...register("username")}
              type="text"
              className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
            />
            {errors.username ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.username.message}
              </span>
            ) : null}
          </div>

          <div className={"flex-col w-full" + (nextPage ? " flex" : " hidden")}>
            <label className="font-medium">Contraseña</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="border rounded-md py-1 pl-2 pr-8 w-full focus:outline-none focus:border-[#D642C0] focus:ring-1 focus:ring-[#D642C0]"
              />
              <button
                className="absolute right-2 inset-y-0"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye className="fill-[#D642C0]" size={20} />
                ) : (
                  <AiFillEyeInvisible className="fill-[#C4C4C4]" size={20} />
                )}
              </button>
            </div>
            {errors.password ? (
              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
                {errors.password.message}
              </span>
            ) : null}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={
              "/ bg-[#D642C0] text-white dark:bg-white dark:text-black lg:py-3 py-1.5 px-3.5 mt-2 rounded-full" +
              (!nextPage ? " hidden" : "")
            }
          >
            {isSubmitting ? "Cargando.." : "Unirme"}
          </button>

          <button
            type="button"
            onClick={() => setNextPage(!nextPage)}
            className={
              "border border-[#D642C0] text-[#D642C0] hover:bg-[#D642C0] hover:text-white dark:text-black lg:py-3 py-1.5 px-3.5 mt-2 rounded-full " +
              (!nextPage
                ? " border border-[#D642C0] text-[#D642C0] hover:bg-[#D642C0] hover:text-white dark:bg-white dark:text-black mt-2"
                : " border text-black dark:border-white dark:text-white")
            }
          >
            {nextPage ? "Volver atras" : "Siguiente"}
          </button>
          <Link
            href="/signin"
            className="block text-sm font-medium -tracking-wide mt-4 opacity-90 w-fit"
          >
            ¿Tenes cuenta?
            <strong className="underline text-[#D642C0]">
              {" "}
              Ingresa desde aca.
            </strong>
          </Link>
        </form>
      </section>
    </>
  );
}
