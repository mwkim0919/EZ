import { Category, Transaction } from 'src/types/budget';
import * as R from 'ramda';

export interface CategoryMap {
  nameSet: string[];
  limit: number | string | null;
}

export interface MonthlyDepositWithdraw {
  [month: string]: DepositWithdraw;
}

export interface DepositWithdraw {
  deposit: number;
  withdraw: number;
}

function initializeCategoryMaps(categories: Category[]): object {
  const result = {
    Others: {
      expense: 0,
      limit: 0
    }
  };
  for (const category of categories) {
    let categoryTemp = category;
    const keyArray = [categoryTemp.name];
    while (categoryTemp.parentCategory) {
      keyArray.push(categoryTemp.parentCategory.name);
      categoryTemp = categoryTemp.parentCategory;
    }
    const key = keyArray.reverse().join(' / ');
    result[key] = {
      expense: 0,
      limit: category.categoryLimit ? Number(category.categoryLimit) : 0,
    };
  }
  return result;
}

export const storeAllParentCategoryNames = (
  category: Category,
  resultArray: string[]
): string[] => {
  if (category.parentCategory != null) {
    resultArray.push(category.parentCategory.name);
    storeAllParentCategoryNames(category.parentCategory, resultArray);
  }
  return resultArray;
};

export const generateCategoryMaps = (
  categories: Category[],
  transactions: Transaction[]
) => {
  const result = initializeCategoryMaps(categories);
  for (const transaction of transactions) {
    const categoryNames = getCategoryNames(transaction.categoryId, categories);
    const amount = transaction.withdraw ? Number(transaction.withdraw) : 0;
    let key = '';
    for (const categoryName of categoryNames) {
      key += categoryName;
      console.log(key);
      result[key].expense += amount;
      key += ' / ';
    }
  }
  return result;
};

function getCategoryNames(
  categoryId: number | null,
  categories: Category[]
): string[] {
  if (categoryId === null) {
    return ['Others']
  }
  let selectedCategory = categories.filter(
    category => category.id === categoryId
  )[0];
  return putRelatedCategoryNamesInArray()

  function putRelatedCategoryNamesInArray(): string[] {
    const keyArray = [selectedCategory.name];
    while (selectedCategory.parentCategory) {
      keyArray.push(selectedCategory.parentCategory.name);
      selectedCategory = selectedCategory.parentCategory;
    }
    return keyArray.reverse();
  }
}

export const generateFullCategoryMaps = (
  categories: Category[]
): CategoryMap => {
  const others = 'Others';
  return categories.reduce(
    (acc: CategoryMap, category: Category) => {
      acc[category.name] = {
        nameSets: storeAllParentCategoryNames(category, [
          category.name,
        ]).reverse(),
        limit: category.categoryLimit,
      };
      return acc;
    },
    {
      Others: {
        nameSets: [others],
        limit: 0,
      },
    }
  );
};

export const generateParentCategoryWithdrawMaps = (
  transactions: Transaction[],
  categories: Category[]
): object => {
  return transactions.reduce((acc: object, transaction: Transaction) => {
    const amount = transaction.withdraw ? Number(transaction.withdraw) : 0;
    const categoryName = transaction.categoryId
      ? getParentCategoryNameById(transaction.categoryId, categories)
      : 'Others';
    acc[categoryName] = acc[categoryName] ? acc[categoryName] + amount : amount;
    return acc;
  }, {});
};

export const groupAmountByCategory = (transactions: Transaction[]): object => {
  return transactions.reduce((acc: object, transaction: Transaction) => {
    const key = transaction.categoryName || 'Others';
    const withdraw = Number(transaction.withdraw);
    acc[key] = acc[key] ? acc[key] + withdraw : withdraw;
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

export const sumDepositAndWithdraw = (
  transactions: Transaction[],
  months: string[]
): MonthlyDepositWithdraw => {
  const result = {};
  for (const month of months) {
    result[month] = transactions.reduce(
      (acc: DepositWithdraw, transaction: Transaction) => {
        if (
          transaction.transactionDatetime.toString().substring(0, 7) === month
        ) {
          acc.deposit += Number(transaction.deposit) || 0;
          acc.withdraw += Number(transaction.withdraw) || 0;
        }
        return acc;
      },
      {
        deposit: 0,
        withdraw: 0,
      }
    );
  }
  return result;
};

function getParentCategoryNameById(id: number, categories: Category[]): string {
  for (const category of categories) {
    if (category.id === id) {
      return getParentCategoryName(category);
    }
  }
  return 'Others';
}

function getParentCategoryName(category: Category): string {
  return category.parentCategory == null
    ? category.name
    : getParentCategoryName(category.parentCategory);
}
