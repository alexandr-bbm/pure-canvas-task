import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

type InputProps = {
  value: string;
  backgroundColor?: string;
  color?: string;
  className?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledInput = styled.input`
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 700;
  background-color: ${(props: InputProps) => props.backgroundColor || 'white'};
  color: ${(props: InputProps) => props.color || Colors['base-text']};
  border: 0;
  width: 100%;
  outline: none;
`;

export const Input = (props: InputProps) =>
  <StyledInput {...props} />;