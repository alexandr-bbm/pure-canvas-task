import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ReduxState } from '../../redux/types';
import { formatDateTime } from '../../utils/dateTime';

export const Container = styled.div`
	font-size: 14px;
`;

type StateProps = {
  time: Date;
}

type OwnProps = {}

type Props = StateProps & OwnProps;

const CurrentDate = ({ time }: Props) => {
  return (
    <Container>
      {formatDateTime(time, 'long')}
    </Container>
  )
};

function mapStateToProps({ time }: ReduxState) {
  return {
    time,
  }
}

export default connect<StateProps, {}, OwnProps>(mapStateToProps, {})(CurrentDate);