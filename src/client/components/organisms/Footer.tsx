import * as React from 'react';
import { Logo } from '../molecules/Logo';
import { SpaceBetween } from '../atoms/SpaceBetween';
import { Copyright } from '../atoms/Copyright';

export const Footer = () => {
  return (
    <SpaceBetween>
      <Logo theme="gray"/>
      <Copyright/>
    </SpaceBetween>
  )
};