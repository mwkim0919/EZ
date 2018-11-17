import * as React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import TransactionItem from './TransactionItem';
import TransactionBarChart from './TransactionBarChart';
import TransactionPieChart from './TransactionPieChart';
import { Transaction, DeleteTransactions, Category } from 'src/types/budget';
import { connect } from 'react-redux';
import { deleteTransactions } from 'src/actions/budget';

interface Props {
  fetchTransactions: () => void;
  deleteTransactions: DeleteTransactions;
  transactions: Transaction[];
  categories: Category[];
}

class TransactionList extends React.Component<Props> {
  render() {
    const { transactions, categories } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="bar-tab"
              data-toggle="tab"
              href="#bar"
              role="tab"
              aria-controls="bar"
              aria-selected="true"
            >
              Bar
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pie-tab"
              data-toggle="tab"
              href="#pie"
              role="tab"
              aria-controls="pie"
              aria-selected="false"
            >
              Pie
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="bar"
            role="tabpanel"
            aria-labelledby="bar-tab"
            style={{height: 350}}
          >
            <TransactionBarChart transactions={transactions} />
          </div>
          <div
            className="tab-pane fade"
            id="pie"
            role="tabpanel"
            aria-labelledby="pie-tab"
            style={{height: 350}}
          >
            <TransactionPieChart transactions={transactions} categories={categories} />
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
            style={{height: 350}}
          >
            shit
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
              <th />
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: Transaction) => {
              return (
                <TransactionItem
                  key={transaction.id}
                  deleteTransactions={this.props.deleteTransactions}
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

const mapDispatchToProps = {
  deleteTransactions,
};

export default connect(
  null,
  mapDispatchToProps
)(TransactionList);
