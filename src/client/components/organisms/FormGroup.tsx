import * as React from 'react';
import styled from 'styled-components';

type FormGroupProps = {
  label: string;
  children: React.ReactNode;
}

const Container = styled.div`
  & + & {
    margin-top: 28px;
  }
`;

const LabelWrapper = styled.div`
  margin-bottom: 8px;
`;

export const FormGroup = ({ label, children }: FormGroupProps) =>
  <Container>
    <LabelWrapper>{label}</LabelWrapper>
    {children}
  </Container>;