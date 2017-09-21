import * as React from 'react';
import { Heading } from '../atoms/Heading';
import { SpaceBetween } from '../atoms/SpaceBetween';
import CurrentDate from '../molecules/CurrentDate';
import { TotalLabel } from '../atoms/TotalLabel';
import { DealsInfoTable } from '../organisms/DealsInfoTable';
import { removeDeal } from '../../redux/deals/actions';
import { connect } from 'react-redux';
import { ReduxState } from '../../redux/types';
import { Deal } from '../../redux/deals/model';
import { CurrentDealsPlot } from '../organisms/CurrentDealsPlot';

type StateProps = {
  deals: Deal[];
  time: Date;
}

type DispatchProps = {
  removeDeal: (id: number) => void;
}

type Props = StateProps & DispatchProps;

class MainPage extends React.Component<Props> {
  render() {
    const { deals, time, removeDeal } = this.props;
    return (
      <div>
        <SpaceBetween offsetBottom={27}>
          <Heading>Current deals</Heading>
          <CurrentDate/>
        </SpaceBetween>
        <CurrentDealsPlot {...{ deals, time }}/>
        <SpaceBetween offsetBottom={27}>
          <Heading>Deals info</Heading>
          <TotalLabel count={deals.length}/>
        </SpaceBetween>
        <DealsInfoTable {...{ deals, removeDeal }} />
      </div>
    );
  }
}

function mapStateToProps({ deals, time }: ReduxState) {
  return {
    deals,
    time,
  }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, { removeDeal })(MainPage);