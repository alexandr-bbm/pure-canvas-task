import * as React from 'react';
import styled from 'styled-components';
import { Color, Colors } from '../../styles/colors';
import { LogoLabel } from '../atoms/LogoLabel';
import { Circle } from '../atoms/Circle';

type LogoTheme = 'main' | 'gray';
type LogoProps = {
  theme: LogoTheme,
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const CircleColorByLogoTheme: {[key in LogoTheme]: Color} = {
  main: 'primary',
  gray: 'gray-2',
};

const LabelColorByLogoTheme: {[key in LogoTheme]: Color} = {
  main: 'gray-5',
  gray: 'gray-3',
};

export const Logo = ({ theme }: LogoProps) => {
  return (
    <Wrapper>
      <Circle color={Colors[CircleColorByLogoTheme[theme]]} offsetRight={15}/>
      <LogoLabel color={Colors[LabelColorByLogoTheme[theme]]}/>
    </Wrapper>
  )
};
