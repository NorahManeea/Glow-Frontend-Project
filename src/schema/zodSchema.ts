import z from 'zod'

//** Register Schema */
export const registerSchema = z.object({
  email: z.string().email({ message: 'Requires a valid email format' }),
  firstName: z.string().min(1, { message: 'First name is required' }).max(30),
  lastName: z.string().min(1, { message: 'Last name is required' }).max(30),
  password: z.string().min(8, { message: 'Password must at least 8 character' }).max(100)
})

//** Login Schema */
export const loginSchema = z.object({
  email: z.string().email({
    message: 'Requires a valid email format'
  }),
  password: z.string().min(8, { message: 'Password must at least 8 character' }).max(100)
})
//** Forgot Password Schema */
export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Requires a valid email format'
  })
})
//** Reset Password Schema */
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(100),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The provided passwords do not match',
    path: ['confirmPassword']
  })
//** Product Validation */
export const productSchema = z.object({
  name: z.string().min(3).max(100),
  description: z
    .string()
    .min(10, { message: 'Product description must at least 3 characters' })
    .max(500, { message: 'Product description must be 100 characters or less' }),
  image: z.string().min(1, { message: 'Product image is required' }).optional(),
  quantityInStock: z.string().transform(Number),
  price: z.string().transform(Number),
  categories: z.string()
})

//** Category Validation */
export const categorySchema = z.object({
  name: z.string().min(3).max(100)
})
