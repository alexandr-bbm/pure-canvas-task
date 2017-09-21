import * as React from 'react';
import styled from 'styled-components';

import { Deal } from '../../redux/deals/model';
import { Plot } from '../../utils/canvas/plot';
import { Point } from '../../utils/canvas/types';
import { delay, nextTick } from '../../utils/delay';
import { MINUTE, TEN_MINUTES } from '../../utils/dateTime';

const Container = styled.div`
  height: 320px;
  margin-bottom: 66px;
`;

const Canvas = styled.canvas`
  height: 100%;
  width: 100%;
`;

type Props = {
  deals: Deal[],
  time: Date,
};

const PLOT_INIT_DELAY = 100;

export class CurrentDealsPlot extends React.Component<Props> {
  private plot: Plot;
  private canvasEl: HTMLCanvasElement;
  private plotInitFlag = false;

  componentDidMount() {
    // need delay to fix custom font loading issue
    delay(PLOT_INIT_DELAY).then(this.createPlot);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.checkDealsUpdate(nextProps);
    this.checkUpdateByTime(nextProps);
  }

  componentWillUnmount() {
    this.plotInitFlag = false;
  }

  render() {
    return (
      <Container>
        <Canvas innerRef={c => this.canvasEl = c}/>
      </Container>
    )
  }

  checkDealsUpdate(nextProps: Props) {
    if (this.props.deals !== nextProps.deals) {
      this.plotInitDelay()
        .then(() => this.plot.update(this.getDealsPlotPoints()));
    }
  }

  checkUpdateByTime(nextProps: Props) {
    if (nextProps.time.getSeconds() === 0) {
      this.plot.update(
        this.getDealsPlotPoints(),
        { fixedXAxisRange: getXAxisRange() }
      )
    }
  }

  createPlot = () => {
    this.plot = new Plot({
      canvasEl: this.canvasEl,
      data: this.getDealsPlotPoints(),
      fixedXAxisRange: getXAxisRange(),
      defaultYAxisRange: {
        min: 0,
        max: 25,
      },
      displayXValue: (time: number) => new Date(time).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      displayYValue: (dealValue: number) => dealValue.toFixed(2),
    });
    this.plotInitFlag = true;
  };

  getDealsPlotPoints(): Point[] {
    let plotDeals = this.props.deals
      .filter(last10MinutesFilter);

    // берем еще 1 после последней, чтобы на графике начало графика не обрывалось, если до этого были сделки
    const afterLastIndex = this.props.deals.length - plotDeals.length - 1;
    const extraDeal = this.props.deals[afterLastIndex];

    if (plotDeals.length && extraDeal) {
      plotDeals.unshift(extraDeal);
    }

    return plotDeals.map(transformDealToPoint);
  }

  plotInitDelay(): Promise<{}> {
    if (!this.plotInitFlag) {
      return delay(PLOT_INIT_DELAY);
    }
    return Promise.resolve({});
  }
}

function getXAxisRange() {
  const now = new Date();
  now.setSeconds(60); // округление до следующей минуты, 0 секунды.
  const nowMs = now.getTime();
  return {
    max: nowMs,
    min: nowMs - TEN_MINUTES,
  }
}

function transformDealToPoint({ date, value }: Deal): Point {
  return {
    x: Number(date),
    y: Number(value),
  }
}

function last10MinutesFilter({ date }: { date: Date }): boolean {
  return Date.now() - date.getTime() <= TEN_MINUTES;
}
