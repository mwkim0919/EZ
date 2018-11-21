import * as React from 'react';
import TransactionBarChart from 'src/components/Budget/Transaction/TransactionBarChart';
import TransactionTotalChart from 'src/components/Budget/Transaction/TransactionTotalChart';
import TransactionPieChart from 'src/components/Budget/Transaction/TransactionPieChart';
import TransactionLineChart from 'src/components/Budget/Transaction/TransactionLineChart';
import { Transaction, Category } from 'src/types/budget';

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

class TransactionHome extends React.Component<Props> {
  render() {
    const { transactions, categories } = this.props;
    console.log(transactions, categories);
    return (
      <div>
        <div className="card">
          <div className="card-header">Monthly Deposit / Withdraw</div>
          <div className="card-body" style={{ height: 300 }}>
            <TransactionBarChart transactions={transactions} />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <div className="card">
              <div className="card-header">Spending Category</div>
              <div className="card-body" style={{ height: 300 }}>
                <TransactionPieChart
                  transactions={transactions}
                  categories={categories}
                />
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="card">
              <div className="card-header">Profit</div>
              <div className="card-body" style={{ height: 300 }}>
                <TransactionLineChart transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Total Deposit / Withdraw</div>
          <div className="card-body" style={{ height: 300 }}>
            <TransactionTotalChart transactions={transactions} />
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionHome;
