import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('enter a valid email').required(),
  username: yup
    .string()
    .min(4, 'username should be larger than 4 characters')
    .required(),
  password: yup
    .string()
    .min(8, 'password must be larger than 8 characters')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords do not match')
    .required()
});

export default signUpValidationSchema;
