import * as React from 'react';
import TransactionBarChart from './TransactionBarChart';
import TransactionPieChart from './TransactionPieChart';
import TransactionLineChart from './TransactionLineChart';

interface Props {
  transactions: any;
}

const TransactionList = (props: Props) => {
  const transactions = [
    {
      id: 7,
      categoryId: 1,
      categoryName: 'user2 category01',
      description: 'test deposit',
      withdraw: undefined,
      deposit: '100.00',
      createDatetime: '2018-10-27T23:35:59',
      transactionDatetime: '2018-10-28T06:31:49',
    },
    {
      id: 8,
      categoryId: 2,
      categoryName: 'user2 category02',
      description: 'test deposit02',
      withdraw: undefined,
      deposit: '100.00',
      createDatetime: '2018-10-27T23:36:09',
      transactionDatetime: '2018-10-28T06:31:49',
    },
    {
      id: 9,
      categoryId: 3,
      categoryName: 'user2 category02',
      description: 'test withdraw',
      withdraw: '55.55',
      deposit: undefined,
      createDatetime: '2018-10-27T23:36:09',
      transactionDatetime: '2018-10-28T06:31:49',
    },
  ];
  return (
    <div>
      <div>
        <TransactionBarChart transactions={transactions} />
      </div>
      <div>
        <TransactionPieChart transactions={transactions} />
      </div>
      <div>
        <TransactionLineChart transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionList;
