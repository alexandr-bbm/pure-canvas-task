import * as React from 'react';
import styled from 'styled-components';
import { Icon } from '../atoms/Icon/Icon';
import { formatDateTime } from '../../utils/dateTime';
import { Deal } from '../../redux/deals/model';

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const TBody = styled.tbody`
  
`;

const Tr = styled.tr`
  &:nth-child(2n) {
    background-color: #e7f1fa;  
  }

  &:nth-child(2n+1) {
    background-color: #f5f9fd;
  }
  
  &:first-child {
    background-color: white;
  }
`;

const Th = styled.th`
  padding: 12px 18px 14px;
  font-weight: 700;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 18px 13px;

  &:last-child {
    text-align: right;
      cursor: pointer;
  }
`;

const ThId = styled(Th)`
  width: 80px;
`;

const ThDate = styled(Th)`
  width: 220px;
`;

const CrossIcon = styled(Icon)`
  position: relative;
  top: 3px;
`;

type Props = {
  removeDeal: (id: number) => void;
  deals: Deal[];
};

export class DealsInfoTable extends React.Component<Props> {

  render() {
    const { deals, removeDeal } = this.props;

    if (deals.length === 0) {
      return null;
    }

    return (
      <Table>
        <TBody>
        <Tr>
          <ThId>ID</ThId>
          <ThDate>Date</ThDate>
          <Th>Value</Th>
          <Th/>
        </Tr>
        {deals.map(({ id, date, value }) =>
          <Tr key={id}>
            <Td>{id}</Td>
            <Td>{formatDateTime(date, 'short')}</Td>
            <Td>{value}</Td>
            <Td onClick={() => removeDeal(id)}>
              <CrossIcon
                name="cross"
              />
            </Td>
          </Tr>
        )}
        </TBody>
      </Table>
    );
  }
}

