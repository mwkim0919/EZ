import {
  getTransactionMonths,
  generateCategoryMaps,
  generateParentCategoryWithdrawMaps,
  sumDepositAndWithdraw,
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
    expect(categoryAmountMap[transportation]).toHaveProperty(
      ['limit'],
      200.00
    );
    expect(categoryAmountMap[food]).toHaveProperty(['expense'], 229.7);
    expect(categoryAmountMap[food]).toHaveProperty(['limit'], 400.00);
    expect(categoryAmountMap[entertainment]).toHaveProperty(['expense'], 21.23);
    expect(categoryAmountMap[entertainment]).toHaveProperty(
      ['limit'],
      130.00
    );
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(
      ['expense'],
      14.66
    );
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(
      ['limit'],
      100.00
    );
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(
      ['expense'],
      22.03
    );
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(
      ['limit'],
      50.00
    );
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['expense'],
      0
    );
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['limit'],
      20.00
    );
    expect(categoryAmountMap[income]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[income]).toHaveProperty(['limit'], 0);
    expect(categoryAmountMap[education]).toHaveProperty(['expense'], 78.54);
    expect(categoryAmountMap[education]).toHaveProperty(['limit'], 200.00);
    expect(categoryAmountMap[housing]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[housing]).toHaveProperty(['limit'], 1200.00);
    expect(categoryAmountMap[utility]).toHaveProperty(['expense'], 252.5);
    expect(categoryAmountMap[utility]).toHaveProperty(['limit'], 350.00);
  });

  it('should test generateParentCategoryWithdrawMaps', () => {
    const parentCategoryWithdrawMaps = generateParentCategoryWithdrawMaps(transactions, categories);
    
    expect(Object.keys(parentCategoryWithdrawMaps)).toHaveLength(7);
    expect(parentCategoryWithdrawMaps).toHaveProperty([food], 229.7);
    expect(parentCategoryWithdrawMaps).toHaveProperty([transportation], 588);
    expect(parentCategoryWithdrawMaps).toHaveProperty([education], 78.54);
    expect(parentCategoryWithdrawMaps).toHaveProperty([others], 123.45);
    expect(parentCategoryWithdrawMaps).toHaveProperty([entertainment], 21.23);
    expect(parentCategoryWithdrawMaps).toHaveProperty([utility], 252.5);
    expect(parentCategoryWithdrawMaps).toHaveProperty([income], 0);
  });

  it('should test sumDepositAndWithdraw', () => {
    const transactionMonths = getTransactionMonths(transactions);
    const depositWithdrawMaps = sumDepositAndWithdraw(transactions, transactionMonths);
    
    expect(Object.keys(depositWithdrawMaps)).toHaveLength(11);
    expect(depositWithdrawMaps['2018-11']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-10']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-09']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-08']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-07']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-06']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-05']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-04']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-03']).toHaveProperty(['deposit'], 0);
    expect(depositWithdrawMaps['2018-02']).toHaveProperty(['deposit'], 8642.24);
    expect(depositWithdrawMaps['2018-01']).toHaveProperty(['deposit'], 8642.24);

    // expect(depositWithdrawMaps['2018-11']).toHaveProperty(['withdraw'], 325.35);
    expect(depositWithdrawMaps['2018-10']).toHaveProperty(['withdraw'], 14.66);
    expect(depositWithdrawMaps['2018-09']).toHaveProperty(['withdraw'], 148.50);
    expect(depositWithdrawMaps['2018-08']).toHaveProperty(['withdraw'], 148.50);
    expect(depositWithdrawMaps['2018-07']).toHaveProperty(['withdraw'], 148.50);
    expect(depositWithdrawMaps['2018-06']).toHaveProperty(['withdraw'], 148.50);
    expect(depositWithdrawMaps['2018-05']).toHaveProperty(['withdraw'], 148.50);
    expect(depositWithdrawMaps['2018-04']).toHaveProperty(['withdraw'], 98);
    // expect(depositWithdrawMaps['2018-03']).toHaveProperty(['withdraw'], 34.38);
    expect(depositWithdrawMaps['2018-02']).toHaveProperty(['withdraw'], 0);
    expect(depositWithdrawMaps['2018-01']).toHaveProperty(['withdraw'], 78.54);

  });

});
