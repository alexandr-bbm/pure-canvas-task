import * as React from 'react';
import styled from 'styled-components';

type CircleProps = {
  offsetRight: number;
  color: string;
}

export const Circle = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin-right: ${(props: CircleProps) => props.offsetRight}px;
  background-color: ${(props: CircleProps) => props.color};
`;