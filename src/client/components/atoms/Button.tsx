import * as React from 'react';
import styled from 'styled-components';
import { Color, Colors } from '../../styles/colors';
import { StyleProps } from '../../styles/index';

export type ButtonTheme = 'primary' | 'basic';

type ButtonProps = {
  theme: ButtonTheme,
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
} & StyleProps;

const ButtonColorByTheme: {[key in ButtonTheme]: Color} = {
  primary: 'primary',
  basic: 'gray-4',
};

function getBackgroundColor(props: ButtonProps): string {
  if (props.disabled && props.theme === 'primary') {
    return Colors['primary-light'];
  }
  return Colors[ButtonColorByTheme[props.theme]];
}

export const StyledButton = styled.button`
  min-width: 186px;
  min-height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getBackgroundColor};
  pointer-events: ${(props: ButtonProps) => props.disabled ? 'none' : 'all'};
  outline: none;
  border-radius: 3px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: 0;
  cursor: pointer;
`;

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <StyledButton {...rest} >
      {children}
    </StyledButton>
  );
};