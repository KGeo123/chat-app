import yup from 'yup';
import Filter from 'bad-words';

const messageSchema = yup.object().shape({
  value: yup
    .string()
    .required()
    .test({
      message: 'should not contain bad words',
      name: 'badWords',
      test: (message) => {
        const filter = new Filter();
        filter.addWords(...process.env.MORE_BAD_WORDS.split('/'));
        const cleanedMessage = filter.clean(message);
        return message === cleanedMessage;
      }
    }),
  senderId: yup.string().required()
});

export default messageSchema;
