import * as React from 'react';
import { Input } from './Input';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px 24px;
  background-color: #c5e3fd;
  font-size: 18px;
  font-weight: 700;
`;

const InputContainer = styled.div`
  flex-grow: 1;
`;

type MoneyInputProps = {
  currency: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const MoneyInput = ({ currency, value, onChange }: MoneyInputProps) =>
  <Container>
    <CurrencyContainer>
      {currency}
    </CurrencyContainer>
    <InputContainer>
      <Input {...{ value, onChange }} />
    </InputContainer>
  </Container>;