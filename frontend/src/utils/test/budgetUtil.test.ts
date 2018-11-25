import {
  getTransactionMonths,
  generateCategoryMaps,
  generateParentCategoryWithdrawMaps,
  sumMonthlyDepositAndWithdraw,
  sumDepositAndWithdraw,
  filterTransactions,
} from 'src/utils/budgetUtil';
import { transactions, categories } from 'src/utils/test/budgetUtilTestData';

describe('test categoryUtil', () => {
  const [
    others,
    food,
    entertainment,
    coffee,
    utility,
    transportation,
    pizza,
    income,
    education,
    housing,
  ] = [
    'Others',
    'FOOD',
    'ENTERTAINMENT',
    'Coffee',
    'UTILITY',
    'TRANSPORTATION',
    'Pizza',
    'INCOME',
    'EDUCATION',
    'HOUSING',
  ];

  it('should test getTransactionMonths', () => {
    const transactionMonths = getTransactionMonths(transactions);
    expect(transactionMonths).toHaveLength(11);
  });

  it('should test generateCategoryMaps', () => {
    const categoryAmountMap = generateCategoryMaps(categories, transactions);

    expect(Object.keys(categoryAmountMap)).toHaveLength(11);
    expect(categoryAmountMap[others]).toHaveProperty(['expense'], 123.45);
    expect(categoryAmountMap[others]).toHaveProperty(['limit'], 0);
    expect(categoryAmountMap[transportation]).toHaveProperty(['expense'], 588);
    expect(categoryAmountMap[transportation]).toHaveProperty(['limit'], 200.0);
    expect(categoryAmountMap[food]).toHaveProperty(['expense'], 229.7);
    expect(categoryAmountMap[food]).toHaveProperty(['limit'], 400.0);
    expect(categoryAmountMap[entertainment]).toHaveProperty(['expense'], 21.23);
    expect(categoryAmountMap[entertainment]).toHaveProperty(['limit'], 130.0);
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(
      ['expense'],
      14.66
    );
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(['limit'], 100.0);
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(
      ['expense'],
      22.03
    );
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(['limit'], 50.0);
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['expense'],
      0
    );
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['limit'],
      20.0
    );
    expect(categoryAmountMap[income]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[income]).toHaveProperty(['limit'], 0);
    expect(categoryAmountMap[education]).toHaveProperty(['expense'], 78.54);
    expect(categoryAmountMap[education]).toHaveProperty(['limit'], 200.0);
    expect(categoryAmountMap[housing]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[housing]).toHaveProperty(['limit'], 1200.0);
    expect(categoryAmountMap[utility]).toHaveProperty(['expense'], 252.5);
    expect(categoryAmountMap[utility]).toHaveProperty(['limit'], 350.0);
  });

  it('should test generateParentCategoryWithdrawMaps', () => {
    const parentCategoryWithdrawMaps = generateParentCategoryWithdrawMaps(
      transactions,
      categories
    );

    expect(Object.keys(parentCategoryWithdrawMaps)).toHaveLength(7);
    expect(parentCategoryWithdrawMaps).toHaveProperty([food], 229.7);
    expect(parentCategoryWithdrawMaps).toHaveProperty([transportation], 588);
    expect(parentCategoryWithdrawMaps).toHaveProperty([education], 78.54);
    expect(parentCategoryWithdrawMaps).toHaveProperty([others], 123.45);
    expect(parentCategoryWithdrawMaps).toHaveProperty([entertainment], 21.23);
    expect(parentCategoryWithdrawMaps).toHaveProperty([utility], 252.5);
    expect(parentCategoryWithdrawMaps).toHaveProperty([income], 0);
  });

  it('should test sumMonthlyDepositAndWithdraw', () => {
    const transactionMonths = getTransactionMonths(transactions);
    const depositWithdrawMaps = sumMonthlyDepositAndWithdraw(
      transactions,
      transactionMonths
    );

    expect(Object.keys(depositWithdrawMaps)).toHaveLength(11);
    expect(depositWithdrawMaps['2018-11'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-10'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-09'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-08'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-07'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-06'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-05'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-04'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-03'].deposit.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-02'].deposit.toFixed(2)).toEqual(
      '8642.24'
    );
    expect(depositWithdrawMaps['2018-01'].deposit.toFixed(2)).toEqual(
      '8642.24'
    );

    expect(depositWithdrawMaps['2018-11'].withdraw.toFixed(2)).toEqual(
      '325.35'
    );
    expect(depositWithdrawMaps['2018-10'].withdraw.toFixed(2)).toEqual('14.66');
    expect(depositWithdrawMaps['2018-09'].withdraw.toFixed(2)).toEqual(
      '148.50'
    );
    expect(depositWithdrawMaps['2018-08'].withdraw.toFixed(2)).toEqual(
      '148.50'
    );
    expect(depositWithdrawMaps['2018-07'].withdraw.toFixed(2)).toEqual(
      '148.50'
    );
    expect(depositWithdrawMaps['2018-06'].withdraw.toFixed(2)).toEqual(
      '148.50'
    );
    expect(depositWithdrawMaps['2018-05'].withdraw.toFixed(2)).toEqual(
      '148.50'
    );
    expect(depositWithdrawMaps['2018-04'].withdraw.toFixed(2)).toEqual('98.00');
    expect(depositWithdrawMaps['2018-03'].withdraw.toFixed(2)).toEqual('34.37');
    expect(depositWithdrawMaps['2018-02'].withdraw.toFixed(2)).toEqual('0.00');
    expect(depositWithdrawMaps['2018-01'].withdraw.toFixed(2)).toEqual('78.54');
  });

  it('should test sumDepositAndWithdraw', () => {
    const depositWithdraw = sumDepositAndWithdraw(transactions);

    expect(Object.keys(depositWithdraw)).toHaveLength(2);
    expect(depositWithdraw.deposit.toFixed(2)).toEqual('17284.48');
    expect(depositWithdraw.withdraw.toFixed(2)).toEqual('1293.42');
  });

  it('should test filterTransactions with no date and no description', () => {
    const filteredTransactions = filterTransactions(transactions, '', '', '');

    expect(filteredTransactions).toEqual(transactions);
  });

  it('should test filterTransactions with date and no description', () => {
    const filteredTransactions = filterTransactions(
      transactions,
      '2018-01',
      '',
      ''
    );
    expect(filteredTransactions).toHaveLength(3);
  });

  it('should test filterTransactions with no date and description', () => {
    const filteredTransactions = filterTransactions(transactions, '', 'EZ', '');

    expect(filteredTransactions).toHaveLength(4);
    filteredTransactions.forEach(transaction =>
      expect(transaction.description).toContain('EZ')
    );
  });

  it('should test filterTransactions with date and description', () => {
    const filteredTransactions = filterTransactions(transactions, '2018-01', 'EZ', '');

    expect(filteredTransactions).toHaveLength(2);
    filteredTransactions.forEach(transaction =>
      expect(transaction.description).toContain('EZ')
    );
  });

  it('should test filterTransactions with both date and description and transactionType', () => {
    const filteredTransactions = filterTransactions(transactions, '2018-10', 'blenz', 'withdraw');

    expect(filteredTransactions).toHaveLength(1);
    filteredTransactions.forEach(transaction => {
      expect(transaction.description.toLowerCase()).toContain('blenz')
      expect(transaction.deposit).toBeNull();
      expect(transaction.withdraw).toBeTruthy();
    });
  });
});
