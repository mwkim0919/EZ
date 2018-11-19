import * as React from 'react';
import * as R from 'ramda';
import { Bar } from 'react-chartjs-2';
import { Transaction } from 'src/types/budget';
import { 
  getTransactionMonths,
  sumDepositAndWithdraw,
  DepositWithdraw,
} from 'src/utils/budgetUtil';

interface Props {
  transactions: Transaction[];
}

export default class TransactionBarChart extends React.Component<Props> {
  render() {
    const { transactions } = this.props;
    const months = getTransactionMonths(transactions).reverse();
    const depositWithdrawMap = sumDepositAndWithdraw(transactions, months);
    // @ts-ignore
    const deposits = Object.values(depositWithdrawMap).map(
      (depositWithdraw: DepositWithdraw) => depositWithdraw.deposit
    );
    // @ts-ignore
    const withdraws = Object.values(depositWithdrawMap).map(
      (depositWithdraw: DepositWithdraw) => depositWithdraw.withdraw
    );
    const data = {
      labels: months,
      datasets: [
        {
          label: 'Deposit',
          data: deposits,
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
        },
        {
          label: 'Withdraw',
          data: withdraws,
          backgroundColor: '#36a2eb',
          borderColor: '#36a2eb',
        }
      ],
    };
    return (
      <Bar
        data={data}
        // height={350}
        options={{
          maintainAspectRatio: false,
          // responsive: true,
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
