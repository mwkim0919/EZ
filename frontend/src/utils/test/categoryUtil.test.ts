import {
  generateCategoryMaps,
  getTransactionMonths,
  resolveCategoryAndAmount,
  groupAmountByCategory,
} from 'src/utils/categoryUtil';
import { transactions, categories } from 'src/utils/test/categoryUtilTestData';

describe('test categoryUtil', () => {
  it('should get a set of months', () => {
    const transactionMonths = getTransactionMonths(transactions);
    expect(transactionMonths).toHaveLength(11);
  });

  it('should get a category map', () => {
    const categoryMaps = generateCategoryMaps(categories);

    expect(Object.keys(categoryMaps)).toHaveLength(11);

    expect(categoryMaps).toHaveProperty(['Others', 'nameSets'], ['Others']);
    expect(categoryMaps).toHaveProperty(['Others', 'limit'], 0);

    expect(categoryMaps).toHaveProperty(['FOOD', 'nameSets'], ['FOOD']);
    expect(categoryMaps).toHaveProperty(['FOOD', 'limit'], '400.00');

    expect(categoryMaps).toHaveProperty(
      ['Starbucks', 'nameSets'],
      ['FOOD', 'Coffee', 'Starbucks']
    );
    expect(categoryMaps).toHaveProperty(['Starbucks', 'limit'], '20.00');
  });

  it('should group transaction amount by category', () => {
    const transactionAmountByCategory = groupAmountByCategory(transactions);

    expect(Object.keys(transactionAmountByCategory)).toHaveLength(9);
    expect(transactionAmountByCategory['Others']).toEqual(123.45);
    expect(transactionAmountByCategory['FOOD']).toEqual(193.01);
    expect(transactionAmountByCategory['ENTERTAINMENT']).toEqual(21.23);
    expect(transactionAmountByCategory['Coffee']).toEqual(14.66);
    expect(transactionAmountByCategory['UTILITY']).toEqual(252.5);
    expect(transactionAmountByCategory['TRANSPORTATION']).toEqual(588);
    expect(transactionAmountByCategory['Pizza']).toEqual(22.03);
    expect(transactionAmountByCategory['INCOME']).toEqual(0);
    expect(transactionAmountByCategory['EDUCATION']).toEqual(78.54);
  });

  it('should resolve Category and Amount', () => {
    const categoryMaps = generateCategoryMaps(categories);
    const amountByCategory = groupAmountByCategory(transactions);
    const categoryAmountMap = resolveCategoryAndAmount(categoryMaps, amountByCategory);
    console.log(categoryAmountMap);

    expect(Object.keys(categoryAmountMap)).toHaveLength(11);
    expect(categoryAmountMap['Others']).toHaveProperty(['expense'], 123.45);
    expect(categoryAmountMap['Others']).toHaveProperty(['limit'], 0);
    expect(categoryAmountMap['TRANSPORTATION']).toHaveProperty(['expense'], 588);
    expect(categoryAmountMap['TRANSPORTATION']).toHaveProperty(['limit'], '200.00');
    expect(categoryAmountMap['FOOD']).toHaveProperty(['expense'], 229.7);
    expect(categoryAmountMap['FOOD']).toHaveProperty(['limit'], '400.00');
    expect(categoryAmountMap['ENTERTAINMENT']).toHaveProperty(['expense'], 21.23);
    expect(categoryAmountMap['ENTERTAINMENT']).toHaveProperty(['limit'], '130.00');
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(['expense'], 14.66);
    expect(categoryAmountMap['FOOD / Coffee']).toHaveProperty(['limit'], '100.00');
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(['expense'], 22.03);
    expect(categoryAmountMap['FOOD / Pizza']).toHaveProperty(['limit'], '50.00');
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap['FOOD / Coffee / Starbucks']).toHaveProperty(['limit'], '20.00');
    expect(categoryAmountMap['INCOME']).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap['INCOME']).toHaveProperty(['limit'], null);
    expect(categoryAmountMap['EDUCATION']).toHaveProperty(['expense'], 78.54);
    expect(categoryAmountMap['EDUCATION']).toHaveProperty(['limit'], '200.00');
    expect(categoryAmountMap['HOUSING']).toHaveProperty(['expense'], 0);
    expect(categoryAmountMap['HOUSING']).toHaveProperty(['limit'], '1200.00');
    expect(categoryAmountMap['UTILITY']).toHaveProperty(['expense'], 252.5);
    expect(categoryAmountMap['UTILITY']).toHaveProperty(['limit'], '350.00');
  });
});
