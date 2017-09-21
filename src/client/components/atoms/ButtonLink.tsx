import * as React from 'react';
import { Link } from './Link';
import { Button, ButtonTheme } from './Button';
import { RouteName } from '../../utils/routes';
import { StyleProps } from '../../styles/index';
import { History } from 'history';
import LocationDescriptor = History.LocationDescriptor;

type ButtonLinkProps = {
  to: LocationDescriptor;
  onClick?: () => void;
  text: string;
  buttonTheme: ButtonTheme;
} & StyleProps;

export const ButtonLink = ({ to, onClick, text, buttonTheme, style }: ButtonLinkProps) =>
  <Link {...{ to, onClick }}>
    <Button theme={buttonTheme} style={style}>
      {text}
    </Button>
  </Link>;
