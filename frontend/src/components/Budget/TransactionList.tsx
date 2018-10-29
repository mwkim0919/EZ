import * as React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import TransactionItem from './TransactionItem';
import TransactionBarChart from './TransactionBarChart';
import TransactionPieChart from './TransactionPieChart';

interface Props {
  fetchTransactions: Function;
  transactions: any;
}

interface State {
  test: any;
}

export default class TransactionList extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { transactions } = this.props;
    // const transactions = [
    //   {
    //     id: 7,
    //     categoryId: 1,
    //     categoryName: 'user2 category01',
    //     description: 'test deposit',
    //     withdraw: undefined,
    //     deposit: '100.00',
    //     createDatetime: '2018-10-27T23:35:59',
    //     transactionDatetime: '2018-10-28T06:31:49',
    //   },
    //   {
    //     id: 8,
    //     categoryId: 2,
    //     categoryName: 'user2 category02',
    //     description: 'test deposit02',
    //     withdraw: undefined,
    //     deposit: '100.00',
    //     createDatetime: '2018-10-27T23:36:09',
    //     transactionDatetime: '2018-10-28T06:31:49',
    //   },
    //   {
    //     id: 9,
    //     categoryId: 3,
    //     categoryName: 'user2 category02',
    //     description: 'test withdraw',
    //     withdraw: '55.55',
    //     deposit: undefined,
    //     createDatetime: '2018-10-27T23:36:09',
    //     transactionDatetime: '2018-10-28T06:31:49',
    //   },
    // ];
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
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Withdraw</th>
            <th scope="col">Deposit</th>
          </thead>
          <tbody>
            {R.map(
              (transaction: any) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ),
              R.values(transactions)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
