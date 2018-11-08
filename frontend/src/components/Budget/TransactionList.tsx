import * as React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import TransactionItem from './TransactionItem';
import TransactionBarChart from './TransactionBarChart';
import TransactionPieChart from './TransactionPieChart';
import { Transaction } from 'src/types/budget';

interface Props {
  fetchTransactions: () => void;
  transactions: Transaction[];
}

export default class TransactionList extends React.Component<Props> {
  render() {
    const { transactions } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-sm">
            <TransactionBarChart transactions={transactions} />
          </div>
          <div className="col-sm">
            <TransactionPieChart transactions={transactions} />
          </div>
        </div>
        <hr />
        <Link
          to="/budget/transactions/form"
          className="btn btn-primary btn-lg btn-block"
        >
          Add Transaction
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Withdraw</th>
              <th scope="col">Deposit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: Transaction) => {
              return (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
