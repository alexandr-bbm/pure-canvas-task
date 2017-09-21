import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const StyledCopyright = styled.div`
  font-size: 14px;
  color: ${Colors['gray-5']};
`;

export const Copyright = () =>
  <StyledCopyright>
    © {new Date().getFullYear()}. BABIT LTD. All rights reserved
  </StyledCopyright>;
