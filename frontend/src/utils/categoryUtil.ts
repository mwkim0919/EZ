import { Category, Transaction } from 'src/types/budget';
import * as R from 'ramda';

export const storeAllSubCategoryNames = (
  category: Category,
  resultArray: string[]
): string[] => {
  if (category.parentCategory != null) {
    resultArray.push(category.parentCategory.name);
    storeAllSubCategoryNames(category.parentCategory, resultArray);
  }
  return resultArray;
};

export const generateCategoryMaps = (categories: Category[]): object => {
  const others = 'Others';
  return categories.reduce((acc: object, category: Category) => {
    acc[category.name] = {
      nameSets: storeAllSubCategoryNames(category, [category.name]).reverse(),
      limit: category.categoryLimit,
    };
    acc[others] = {
      nameSets: [others],
      limit: 0,
    };
    return acc;
  }, {});
};

export const groupAmountByCategory = (transactions: Transaction[]): object => {
  return transactions.reduce((acc: object, transaction: Transaction) => {
    const key = transaction.categoryName || 'Others';
    if (acc[key]) {
      acc[key] += Number(transaction.withdraw);
    } else {
      acc[key] = Number(transaction.withdraw);
    }
    return acc;
  }, {});
};

export const resolveCategoryAndAmount = (
  categoryMaps: object,
  amountByCategory: object
): object => {
  const result = {};
  const nameSets = 'nameSets';
  const limit = 'limit';
  for (const categoryMap of Object.keys(categoryMaps).map(
    key => categoryMaps[key]
  )) {
    const amounts = R.props(categoryMap[nameSets], amountByCategory);
    const amountToAdd =
      amounts[amounts.length - 1] === undefined
        ? 0
        : Number(amounts[amounts.length - 1]);
    let displayedCategoryName = '';
    for (const categoryName of categoryMap[nameSets]) {
      displayedCategoryName += categoryName;
      if (result[displayedCategoryName] === undefined) {
        result[displayedCategoryName] = {
          expense: amountToAdd,
          limit: categoryMap[limit],
        };
      } else {
        result[displayedCategoryName].expense += amountToAdd;
      }
      displayedCategoryName += ' / ';
    }
  }
  return result;
};

export const getTransactionMonths = (transactions: Transaction[]): string[] => {
  const dateSet = new Set();
  transactions
    .map((transaction: Transaction) =>
      transaction.transactionDatetime.toString().substring(0, 7)
    )
    .sort((a: string, b: string) => b.localeCompare(a))
    .forEach((transaction: string) => {
      dateSet.add(transaction);
    });
  return Array.from(dateSet);
};
