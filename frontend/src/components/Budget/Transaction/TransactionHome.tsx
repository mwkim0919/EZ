import * as React from 'react';
import TransactionBarChart from 'src/components/Budget/Transaction/TransactionBarChart';
import TransactionPieChart from 'src/components/Budget/Transaction/TransactionPieChart';
import TransactionLineChart from 'src/components/Budget/Transaction/TransactionLineChart';
import { Transaction, Category } from 'src/types/budget';

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

class TransactionHome extends React.Component<Props> {
  render() {
    // const { transactions, categories } = this.props;
    // console.log(transactions, categories);
    return (
      <div>
        {/* <div>
          <TransactionBarChart transactions={transactions} />
        </div>
        <div>
          <TransactionPieChart
            transactions={transactions}
            categories={categories}
          />
        </div>
        <div>
          <TransactionLineChart transactions={transactions} />
        </div> */}
      </div>
    );
  }
}

export default TransactionHome;
