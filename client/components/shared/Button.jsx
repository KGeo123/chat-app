import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 3rem;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.4rem;
  color: white;
  border: none;
  background: rgb(12, 96, 223);
  font-size: 1.8rem;
  margin: 0.5rem 0;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 700;

  &:hover,
  &:active {
    background: white;
    color: rgb(12, 96, 223);
  }
`;

export default Button;
