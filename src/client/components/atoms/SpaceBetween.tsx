import styled from 'styled-components';

type SpaceBetweenProps = {
  offsetBottom?: number;
}

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${(props: SpaceBetweenProps) => props.offsetBottom || 0}px;
`;