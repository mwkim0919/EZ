import {
  generateFullCategoryMaps,
  getTransactionMonths,
  resolveCategoryAndAmount,
  groupAmountByCategory,
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

  it('should get a set of months', () => {
    const transactionMonths = getTransactionMonths(transactions);
    expect(transactionMonths).toHaveLength(11);
  });

  it('should get a category map', () => {
    const categoryMaps = generateFullCategoryMaps(categories);

    expect(Object.keys(categoryMaps)).toHaveLength(11);

    expect(categoryMaps).toHaveProperty([others, 'nameSets'], [others]);
    expect(categoryMaps).toHaveProperty([others, 'limit'], 0);

    expect(categoryMaps).toHaveProperty([food, 'nameSets'], [food]);
    expect(categoryMaps).toHaveProperty([food, 'limit'], '400.00');

    expect(categoryMaps).toHaveProperty(
      ['Starbucks', 'nameSets'],
      [food, coffee, 'Starbucks']
    );
    expect(categoryMaps).toHaveProperty(['Starbucks', 'limit'], '20.00');
  });

  it('should group transaction amount by category', () => {
    const transactionAmountByCategory = groupAmountByCategory(transactions);

    expect(Object.keys(transactionAmountByCategory)).toHaveLength(9);
    expect(transactionAmountByCategory[others]).toEqual(123.45);
    expect(transactionAmountByCategory[food]).toEqual(193.01);
    expect(transactionAmountByCategory[entertainment]).toEqual(21.23);
    expect(transactionAmountByCategory[coffee]).toEqual(14.66);
    expect(transactionAmountByCategory[utility]).toEqual(252.5);
    expect(transactionAmountByCategory[transportation]).toEqual(588);
    expect(transactionAmountByCategory[pizza]).toEqual(22.03);
    expect(transactionAmountByCategory[income]).toEqual(0);
    expect(transactionAmountByCategory[education]).toEqual(78.54);
  });

  it('should resolve Category and Amount', () => {
    const categoryMaps = generateFullCategoryMaps(categories);
    const amountByCategory = groupAmountByCategory(transactions);
    const categoryAmountMap = resolveCategoryAndAmount(
      categoryMaps,
      amountByCategory
    );
    console.log(categoryAmountMap);

    expect(Object.keys(categoryAmountMap)).toHaveLength(11);
    expect(categoryAmountMap[others]).toHaveProperty(['expense'], 123.45);
    expect(categoryAmountMap[others]).toHaveProperty(['limit'], 0);
    expect(categoryAmountMap[transportation]).toHaveProperty(['expense'], 588);
    expect(categoryAmountMap[transportation]).toHaveProperty(
      ['limit'],
      '200.00'
    );
    expect(categoryAmountMap[food]).toHaveProperty(['expense'], 229.7);
    expect(categoryAmountMap[food]).toHaveProperty(['limit'], '400.00');
    expect(categoryAmountMap[entertainment]).toHaveProperty(['expense'], 21.23);
    expect(categoryAmountMap[entertainment]).toHaveProperty(
      ['limit'],
      '130.00'
    );
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(
      ['expense'],
      14.66
    );
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(
      ['limit'],
      '100.00'
    );
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(
      ['expense'],
      22.03
    );
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(
      ['limit'],
      '50.00'
    );
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['expense'],
      0
    );
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(
      ['limit'],
      '20.00'
    );
    expect(categoryAmountMap[income]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[income]).toHaveProperty(['limit'], null);
    expect(categoryAmountMap[education]).toHaveProperty(['expense'], 78.54);
    expect(categoryAmountMap[education]).toHaveProperty(['limit'], '200.00');
    expect(categoryAmountMap[housing]).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap[housing]).toHaveProperty(['limit'], '1200.00');
    expect(categoryAmountMap[utility]).toHaveProperty(['expense'], 252.5);
    expect(categoryAmountMap[utility]).toHaveProperty(['limit'], '350.00');
  });
});
