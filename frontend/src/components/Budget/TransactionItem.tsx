import * as React from 'react';
import { Transaction } from 'src/types/budget';

interface Props {
  transaction: Transaction;
}

export default class TransactionItem extends React.Component<Props> {
  render() {
    const { transaction } = this.props;
    const {
      // id,
      // categoryId,
      categoryName,
      description,
      withdraw,
      deposit,
      // createDatetime,
      transactionDatetime,
    } = transaction;

    return (
      <tr>
        <td>{(transactionDatetime as string).split('T')[0]}</td>
        <td>{description}</td>
        <td>{categoryName}</td>
        <td>{withdraw}</td>
        <td>{deposit}</td>
      </tr>
    );
  }
}
