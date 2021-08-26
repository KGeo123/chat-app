import styled from 'styled-components';

const Brand = styled.h1`
  color: rgb(12, 96, 223);
  text-align: center;
  font-weight: 700;
	margin: 2rem;
`;

export default function Logo() {
  return <Brand>UMessage</Brand>;
}
