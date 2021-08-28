import { Form as FormikForm } from 'formik';
import styled from 'styled-components';

const Form = styled(FormikForm)`
  width: 100%;
  max-width: 30rem;
  background: white;
  margin:  2rem auto;
	padding: 0.4rem;

  @media (min-width: 40rem) {
    border-radius: 1rem;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
    padding: 1.4rem;
  }
`;

export default Form;
