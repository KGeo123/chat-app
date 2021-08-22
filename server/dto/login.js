import yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('email must be valid').required(),
  password: yup
    .string()
    .min(8, 'password must have at least 8 characters')
    .required()
});

export default loginSchema
