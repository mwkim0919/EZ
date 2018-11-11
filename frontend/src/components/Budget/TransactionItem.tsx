import * as React from 'react';
import { Transaction, DeleteTransactions } from 'src/types/budget';

interface Props {
  transaction: Transaction;
  deleteTransactions: DeleteTransactions;
}

export default class TransactionItem extends React.Component<Props> {
  deleteTransactions = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.deleteTransactions([id]);
    }
  };

  render() {
    const { transaction } = this.props;
    const {
      id,
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
        <td>
          <button
            onClick={e => {
              e.stopPropagation();
              this.deleteTransactions(id);
            }}
            className="btn btn-danger"
          >
            <i className="material-icons">clear</i>
          </button>
        </td>
      </tr>
    );
  }
}
