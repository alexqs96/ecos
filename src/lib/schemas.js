import { z } from 'zod'

export const SignInSchema = z.object({
  username: z
    .string()
    .min(4, "Porfavor ingresa tu usuario.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
  password: z.string().min(4, "Porfavor ingresa tu contraseña."),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(4, "Porfavor ingresa tu usuario.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
  password: z.string().min(4, "Porfavor ingresa tu contraseña."),
  email: z.string().email("Porfavor ingresa tu email."),
  name: z
    .string()
    .min(4, "Porfavor ingresa tu nombre.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
  surname: z
    .string()
    .min(4, "Porfavor ingresa tu apellido.")
    .max(80, "Porfavor no ingreses mas de 80 caracteres."),
});

export const PostFormSchema = z.object({
  content: z.string(),
});