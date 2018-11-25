import * as React from 'react';
import { Link } from 'react-router-dom';
import TransactionItem from 'src/components/Budget/Transaction/TransactionItem';
import TransactionBarChart from 'src/components/Budget/Transaction/TransactionBarChart';
import TransactionPieChart from 'src/components/Budget/Transaction/TransactionPieChart';
import TransactionLineChart from 'src/components/Budget/Transaction/TransactionLineChart';
import { Transaction, DeleteTransactions, Category } from 'src/types/budget';
import { getTransactionMonths, filterTransactions } from 'src/utils/budgetUtil';
import { connect } from 'react-redux';
import { deleteTransactions } from 'src/actions/budget';

interface Props {
  deleteTransactions: DeleteTransactions;
  transactions: Transaction[];
  categories: Category[];
}

type TransactionType = 'deposit' | 'withdraw' | '';

interface State {
  month: string;
  description: string;
  transactionType: TransactionType;
}

class TransactionList extends React.Component<Props, State> {
  state = {
    month: '',
    description: '',
    transactionType: '' as TransactionType,
  };

  selectDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ month: e.target.value });
  };

  selectTransactionType = (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ transactionType: e.currentTarget.value as TransactionType });
  }

  render() {
    const { transactions, categories } = this.props;
    const months = getTransactionMonths(transactions);
    const { month, description, transactionType } = this.state;
    const selectedTransactions = filterTransactions(
      transactions,
      month,
      description,
      transactionType
    );
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
              id="line-tab"
              data-toggle="tab"
              href="#line"
              role="tab"
              aria-controls="line"
              aria-selected="false"
            >
              Line
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="bar"
            role="tabpanel"
            aria-labelledby="bar-tab"
            style={{ height: 350 }}
          >
            <TransactionBarChart transactions={selectedTransactions} />
          </div>
          <div
            className="tab-pane fade"
            id="pie"
            role="tabpanel"
            aria-labelledby="pie-tab"
            style={{ height: 350 }}
          >
            <TransactionPieChart
              transactions={selectedTransactions}
              categories={categories}
            />
          </div>
          <div
            className="tab-pane fade"
            id="line"
            role="tabpanel"
            aria-labelledby="line-tab"
            style={{ height: 350 }}
          >
            <TransactionLineChart transactions={selectedTransactions} />
          </div>
        </div>
        <hr />
        <form className="form-inline" onSubmit={e => e.preventDefault()}>
          <label className="sr-only" htmlFor="date">
            Date
          </label>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="material-icons">calendar_today</i>
              </div>
            </div>
            <select
              className="form-control"
              id="date"
              onChange={this.selectDate}
            >
              <option value="">All</option>
              {months.map((date: string) => {
                return <option key={date}>{date}</option>;
              })}
            </select>
          </div>
          <label className="sr-only" htmlFor="description">
            Description
          </label>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="material-icons">search</i>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transactionType"
              id="all"
              value=""
              onClick={this.selectTransactionType}
              defaultChecked
            />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transactionType"
              id="deposit"
              value="deposit"
              onClick={this.selectTransactionType}
            />
            <label className="form-check-label" htmlFor="deposit">
              Deposit
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transactionType"
              id="withdraw"
              value="withdraw"
              onClick={this.selectTransactionType}
            />
            <label className="form-check-label" htmlFor="withdraw">
              Withdraw
            </label>
          </div>
        </form>
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
            {selectedTransactions.map((transaction: Transaction) => {
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
