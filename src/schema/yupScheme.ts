import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(5).max(32).required()
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(32).required()
})

export const productSchema = yup.object().shape({
  name: yup.string().required('Name is required".'),
  image: yup.string().required('Image is required"'),
  description: yup.string().required('Description is required"'),
  categories: yup.string(),
  variants: yup.string(),
  sizes: yup.number(),
  price: yup.number().required('Price is required')
})
