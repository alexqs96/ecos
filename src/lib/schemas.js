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

export const GardenFormSchema = z.object({
  name: z.string().min(1),
  width: z.number().min(1),
  height: z.number().min(1),
  vegetables: z.array(z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    icon: z.string(),
    quantity: z.number().min(1),
    space: z.number().min(0)
  }))
});