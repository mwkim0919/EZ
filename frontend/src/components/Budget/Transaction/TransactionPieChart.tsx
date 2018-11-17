import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Transaction, Category } from 'src/types/budget';
import {
  storeAllParentCategoryNames,
  generateCategoryMaps,
  getTransactionMonths,
  resolveCategoryAndAmount,
  groupAmountByCategory,
} from 'src/utils/budgetUtil';

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

export default class TransactionPieChart extends React.Component<Props> {
  render() {
    const { transactions, categories } = this.props;
    const categoryMaps = generateCategoryMaps(categories);
    const categoryAmountMap = resolveCategoryAndAmount(
      categoryMaps,
      groupAmountByCategory(transactions)
    );
    console.log(categoryMaps, categoryAmountMap);
    const data = {
      labels: Object.keys(categoryAmountMap),
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <Pie
        data={data}
        // width={100}
        // height={350}
        options={{
          maintainAspectRatio: false,
          // responsive: true,
          legend: {
            position: 'right',
          },
        }}
      />
    );
  }
}
