import yup from 'yup';
import Filter from 'bad-words';

const signUpSchema = yup.object().shape({
  email: yup.string().email('must be a valid email').required(),
  username: yup
    .string()
    .required()
    .test({
      name: 'noBadWords',
      message: 'no bad words allowed',
      test: (value) => {
        const filter = new Filter();
        const cleanedUsername = filter.clean(value);
        return cleanedUsername === value;
      }
    }),
  password: yup
    .string()
    .min(8, 'password must be larger than 8 characters')
    .required()
});

export default signUpSchema;
