import * as React from 'react';
import { Heading } from '../atoms/Heading';
import { SpaceBetween } from '../atoms/SpaceBetween';
import CurrentDate from '../molecules/CurrentDate';
import { SuccessDealBox } from '../molecules/SuccessDealBox';
import { routeFor } from '../../utils/routes';
import { ButtonLink } from '../atoms/ButtonLink';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { History, LocationDescriptorObject } from 'history';

type Props = RouteComponentProps<{}>

const nextPageDescriptor: LocationDescriptorObject = { pathname: routeFor.Index, state: { dealValue: null } };

class SuccessDealPage extends React.Component<Props, {}> {

  componentDidMount() {
    window.document.addEventListener('keydown', this.keyDownHandler)
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.keyDownHandler)
  }

  render() {
    const { location } = this.props;
    if (!location.state || !location.state.dealValue) {
      return <Redirect to={routeFor.Index}/>;
    }

    const { dealValue } = location.state;

    return (
      <div>
        <SpaceBetween offsetBottom={30}>
          <Heading>Your deal confirmed!</Heading>
          <CurrentDate/>
        </SpaceBetween>
        <SuccessDealBox text={`USD ${dealValue}`}/>
        <ButtonLink
          to={nextPageDescriptor}
          buttonTheme="primary"
          text="OK"
          style={{ margin: '47px auto' }}
        />
      </div>
    );
  }

  keyDownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.props.history.push(nextPageDescriptor.pathname, nextPageDescriptor.state);
    }
  }
}

export default withRouter(SuccessDealPage);