import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from '../atoms/Icon/Icon';

const rotate360 = keyframes`
  from {   
    transform: translateX(-1080px)
  }
	to {
		transform: translateX(0)
	}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 58px 66px;
  border-radius: 3px;
	background-color: rgba(0, 208, 162, 0.09);
	border: solid 2px #00d0a2;
  animation: ${rotate360} 0.5s ease 1;
`;

const DealText = styled.div`
	font-size: 72px;
	height: 56px;
`;

type SuccessDealBoxProps = {
  text: string;
}

export const SuccessDealBox = ({ text }: SuccessDealBoxProps) =>
  <Container innerRef={r => this.input = r}>
    <Icon name="success-circle" style={{ marginRight: '30px' }}/>
    <DealText>{text}</DealText>
  </Container>;
