import * as React from 'react';
import { Heading } from '../atoms/Heading';
import { SpaceBetween } from '../atoms/SpaceBetween';
import CurrentDate from '../molecules/CurrentDate';
import NewDeal from '../organisms/NewDeal';

export class NewDealPage extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <SpaceBetween offsetBottom={30}>
          <Heading>New deal</Heading>
          <CurrentDate/>
        </SpaceBetween>
        <NewDeal/>
      </div>
    );
  }
}