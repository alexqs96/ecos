"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsImage } from 'react-icons/bs'
import { PiUserCircleFill } from 'react-icons/pi'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { EcosLogo } from "./Icons";

const SignInSchema = z.object({
  user: z
    .string()
    .min(4, "Porfavor ingresa tu usuario.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
  password: z.string().min(4, "Porfavor ingresa tu contraseña."),
});

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    console.log("Enviado");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-xs w-[95%] h-fit p-8 rounded-2xl dark:bg-white/5 shadow-xl mx-auto"
    >
      <div className="flex flex-col items-center gap-1 font-semibold text-sm mb-4">
        <EcosLogo size={64} />
        <i>{'"Ecos conectando raices"'}</i>
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium">Usuario</label>
        <input
          {...register("user")}
          type="text"
          className="border rounded-md py-1 px-2 w-full"
        />
        {errors.user ? (
          <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
            {errors.user.message}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium">Contraseña</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="border rounded-md py-1 pl-2 pr-8 w-full"
          />
          <button
            className="absolute right-2 inset-y-0"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEye size={20} />
            ) : (
              <AiFillEyeInvisible size={20} />
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
        className="bg-black text-white dark:bg-white dark:text-black py-1.5 px-3.5 rounded-md"
      >
        {isSubmitting ? "Ingresando.." : "Ingresar"}
      </button>

      <Link href="/signup" className="block text-sm font-medium -tracking-wide mt-4 opacity-90 w-fit">¿No tienes cuenta? Regístrate aqui.</Link>
    </form>
  );
}

const SignUpSchema = z.object({
  email: z.string().email("Porfavor Ingresa tu email"),
  user: z
    .string()
    .min(4, "Porfavor ingresa tu usuario.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
  password: z.string().min(4, "Porfavor ingresa tu contraseña."),
});

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    console.log("Enviado");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-xs w-[95%] h-fit p-8 rounded-2xl dark:bg-white/5 shadow-xl mx-auto"
    >
      <div className="flex flex-col items-center gap-1 font-semibold text-sm mb-4">
        <EcosLogo size={64} />
        <i>{'"Ecos conectando raices"'}</i>
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium">Email</label>
        <input
          {...register("email")}
          type="text"
          className="border rounded-md py-1 px-2 w-full"
        />
        {errors.email ? (
          <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
            {errors.email.message}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium">Usuario</label>
        <input
          {...register("user")}
          type="text"
          className="border rounded-md py-1 px-2 w-full"
        />
        {errors.user ? (
          <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-md text-sm mt-1.5 w-fit">
            {errors.user.message}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium">Contraseña</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="border rounded-md py-1 pl-2 pr-8 w-full"
          />
          <button
            className="absolute right-2 inset-y-0"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEye size={20} />
            ) : (
              <AiFillEyeInvisible size={20} />
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
        className="bg-black text-white dark:bg-white dark:text-black py-1.5 px-3.5 rounded-md"
      >
        {isSubmitting ? "Enviando.." : "Unirme"}
      </button>

      <Link href="/signin" className="block text-sm font-medium -tracking-wide mt-4 opacity-90 w-fit">¿Tenes cuenta? Ingresa desde aca.</Link>
    </form>
  );
}

const PostFormSchema = z.object({
  images: z.array(z.string().default("")),
  content: z.string().min(4, "Escribi almenos 4 caracteres."),
});

export function PostForm(){
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PostFormSchema),
  });

  function handleResizeInput(e) {
    const lengthMin = 70
    const heightLimitInPX = 160

    if (e.target.value.length < 30) {
      e.target.style.height = "auto"
    } else if (e.target.scrollHeight > lengthMin && e.target.scrollHeight <= heightLimitInPX) {
      e.target.style.height = e.target.scrollHeight + "px"
    }

    return null
  }

  const onSubmit = async (data) => {
    console.log(data);
    console.log("Enviado");
  };

  return(
    <div
      className="flex gap-5 h-fit py-6 px-2 border-b dark:border-white/20"
    >
      <PiUserCircleFill size={48} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <textarea
          onChange={e => handleResizeInput(e)}
          className="not-sr-only bg-transparent resize-none outline-none w-full transition-[height]   duration-200 border-b border-b-transparent focus-within:border-b-black/5 focus-within:dark:border-white/20 pb-2"
          placeholder="Comparti lo que quieras aqui."
        >

        </textarea>
        <div
          className="flex items-center justify-between mt-2"
        >
          <label
            className="cursor-pointer"
            htmlFor="uploadImage"
          >
            <input
              {...register("content")}
              className="hidden"
              id="uploadImage"
              type="file"
              multiple
            />
            <BsImage size={20} />
          </label>

          <button className="py-1.5 px-3 rounded-md bg-black text-white dark:bg-white dark:text-black" type="button">Postear</button>
        </div>
      </form>
    </div>
  )
}