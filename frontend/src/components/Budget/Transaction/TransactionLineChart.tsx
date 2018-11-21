import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Transaction } from 'src/types/budget';
import {
  getTransactionMonths,
  sumMonthlyDepositAndWithdraw,
} from 'src/utils/budgetUtil';

interface Props {
  transactions: Transaction[];
}

export default class TransactionLineChart extends React.Component<Props> {
  render() {
    const { transactions } = this.props;
    const months = getTransactionMonths(transactions).reverse();
    const depositWithdrawMap = sumMonthlyDepositAndWithdraw(transactions, months);
    const data = {
      labels: months,
      datasets: [
        {
          label: 'Profit',
          data: Object.keys(depositWithdrawMap).map(
            key =>
              depositWithdrawMap[key].deposit - depositWithdrawMap[key].withdraw
          ),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255,99,132,1)'],
          borderWidth: 1,
        },
      ],
    };
    return (
      <Line
        data={data}
        options={{
          maintainAspectRatio: false,
          legend: {
            position: 'right',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    );
  }
}
