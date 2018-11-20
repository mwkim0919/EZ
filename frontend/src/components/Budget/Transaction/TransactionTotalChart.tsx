import * as React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { Transaction } from 'src/types/budget';
import { 
  sumDepositAndWithdraw,
} from 'src/utils/budgetUtil';

interface Props {
  transactions: Transaction[]
};

export default class TransactionTotalChart extends React.Component<Props> {
  render() {
    const { transactions } = this.props;
    const depositWithdraw = sumDepositAndWithdraw(transactions);
    const data = {
      labels: ['Deposit', 'Withdraw'],
      datasets: [
        {
          data: [depositWithdraw.deposit, depositWithdraw.withdraw],
          backgroundColor: ['#ff6384', '#36a2eb'],
          borderColor: ['#ff6384', '#36a2eb'],
        },
      ],
    };
    return (
      <HorizontalBar
        data={data}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false,
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
