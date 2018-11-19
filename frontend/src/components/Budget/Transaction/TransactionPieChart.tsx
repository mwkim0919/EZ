import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Transaction, Category } from 'src/types/budget';
import {
  generateParentCategoryWithdrawMaps,
} from 'src/utils/budgetUtil';
import { getRandomColors } from 'src/utils/chartUtil'

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

export default class TransactionPieChart extends React.Component<Props> {
  render() {
    const { transactions, categories } = this.props;
    const categoryWithdrawMap = generateParentCategoryWithdrawMaps(
      transactions,
      categories
    );

    const data = {
      labels: Object.keys(categoryWithdrawMap),
      datasets: [
        {
          label: 'Withdraw by category',
          data: Object.keys(categoryWithdrawMap).map(
            key => categoryWithdrawMap[key]
          ),
          backgroundColor: getRandomColors(Object.keys(categoryWithdrawMap)),
        },
      ],
    };
    return (
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
          legend: {
            position: 'right',
          },
        }}
      />
    );
  }
}
