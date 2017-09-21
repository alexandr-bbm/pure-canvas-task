import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { FormGroup } from './FormGroup';
import { DisabledInput } from '../atoms/DisabledInput';
import { MoneyInput } from '../atoms/MoneyInput';
import { routeFor } from '../../utils/routes';
import { Button } from '../atoms/Button';
import { ReduxState } from '../../redux/types';
import { connect } from 'react-redux';
import { formatDateTime } from '../../utils/dateTime';
import { addDeal, SubmitDeal } from '../../redux/deals/actions';

const Form = styled.form`
  padding: 31px 41px;
	background-color: #e7f1fa;
`;

type StateProps = {
  time: Date;
}

type DispatchProps = {
  addDeal: (deal: SubmitDeal) => Promise<void>;
}

type Props = StateProps & DispatchProps & RouteComponentProps<{}>;

type State = {
  dealValue: string;
}

class NewDeal extends React.Component<Props, State> {

  state = {
    dealValue: '25.00'
  };

  render() {
    const { time } = this.props;
    const { dealValue } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <FormGroup label="Current date">
          <DisabledInput value={formatDateTime(time, 'long')}/>
        </FormGroup>
        <FormGroup label="Value">
          <MoneyInput currency="USD" value={dealValue} onChange={this.handleValueChange}/>
        </FormGroup>
        <Button
          theme="primary"
          style={{ marginTop: '45px' }}
          disabled={!this.isDealValueValid()}
        >
          New Deal
        </Button>
      </Form>
    )
  }

  isDealValueValid = () => {
    const dealValueNum = Number(this.state.dealValue);
    return !isNaN(dealValueNum) && isFinite(dealValueNum) && dealValueNum > 0;
  };

  handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ dealValue: e.target.value });

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.isDealValueValid()) {
      return;
    }
    const { dealValue } = this.state;
    const submitData = {
      value: dealValue,
      date: this.props.time.toISOString(),
    };

    this.props.addDeal(submitData)
      .then(() => this.props.history.push(routeFor.DealSuccess, { dealValue }));
  }
}

function mapStateToProps({ time }: ReduxState) {
  return {
    time,
  }
}

export default connect<StateProps, DispatchProps, {}>
(mapStateToProps, { addDeal })(withRouter(NewDeal));