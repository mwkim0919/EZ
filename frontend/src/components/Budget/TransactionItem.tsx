import * as React from 'react';

interface Props {
  transaction: any;
}

export default class TransactionItem extends React.Component<Props> {
  render() {
    console.log('Todo actions ', this.props);
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
        <td>{transactionDatetime.split("T")[0]}</td>
        <td>{description}</td>
        <td>{categoryName}</td>
        <td>{withdraw}</td>
        <td>{deposit}</td>
      </tr>
    );
  }
}
