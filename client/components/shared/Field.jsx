import { Field as FormikField } from 'formik';
import styled from 'styled-components';

const Field = styled(FormikField)`
  width: 100%;
  margin: 0.4rem 0;
  height: 3rem;
  padding: 0.9rem;
  font-size: 1.4rem;
  caret-color: rgb(12, 96, 223);
  background: #f3f0f0;
  border: none;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.4rem;

  &:focus {
		outline: none;
  }
`;

export default Field;
