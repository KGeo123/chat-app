import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('enter a valid email').required(),
  password: yup
    .string()
    .trim()
    .min(8, 'password must be larger than 8 characters')
    .required()
});

export default loginSchema
