import * as React from 'react';
import styled, { StyledProps } from 'styled-components';
import { StyleProps } from '../../../styles/index';

const StyledIcon = styled.div`
  display: inline-flex;
`;

type IconProps = {
  name: string;
  onClick?: () => void;
} & StyleProps;

export const Icon = (props: IconProps) => {
  const { name, ...rest } = props;
  return (
    <StyledIcon
      dangerouslySetInnerHTML={{ __html: require(`./icons/${name}.svg`) }}
      {...rest}
    />
  )
};
