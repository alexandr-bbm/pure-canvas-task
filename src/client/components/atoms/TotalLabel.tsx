import * as React from 'react';
import styled from 'styled-components';

const StyledTotalLabel = styled.div`
  padding: 7px 12px 3px;
	border-radius: 3px;
	background-color: #7ebaff;
	color: white;
`;

type TotalLabelProps = {
  count: number;
}

export const TotalLabel = ({ count }: TotalLabelProps) =>
  count > 0
    ?
    <StyledTotalLabel>
      Total: {count} {count > 1 ? 'deals' : 'deal'}
    </StyledTotalLabel>
    : null;