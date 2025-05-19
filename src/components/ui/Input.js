import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: border-color ${({ theme }) => theme.transitions.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

function Input(props) {
  return <StyledInput {...props} />;
}

export default Input;
